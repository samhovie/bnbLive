// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Review, ReviewImage, Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


// get reviews of current user
router.get(
    '/reviews/current',
    requireAuth,
    async (req, res) => {

        let reviews = await Review.findAll({
            where: {
                userId: req.user.id
            }
        })


        for(let review of reviews) {
            let reviewImages = await ReviewImage.findAll({
                where:{ reviewId: review.id},
                attributes: {
                    exclude: ["reviewId", "createdAt", "updatedAt"]
                }
            });
            let spot = await Spot.findOne({
                where: { id: review.spotId},
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"]
                }
            });
            let user = await User.findByPk(spot.ownerId,{
                attributes: {
                    exclude: ["username"]
                }
            });
            let prevImage = await SpotImage.findOne({
                where: {
                    [Op.and]: {
                        spotId: spot.id,
                        preview: true
                    }
                }
            });

            if (prevImage) {
                spot.dataValues.previewImage = prevImage.url
            }
            else {
                spot.dataValues.previewImage = 'none'
            }

            review.dataValues.User = user;
            review.dataValues.Spot = spot;
            review.dataValues.ReviewImages = reviewImages;

        }


        return res.json({
            Reviews: reviews
        });

    }

);



// get reviews by spotId
router.get(
    '/spots/:spotId/reviews',
    async (req, res) => {

        let spotId = req.params.spotId;
        let spot = await Spot.findByPk(spotId)

        let reviews = await Review.findAll({
            where: {
                spotId: spotId
            }
        })

        for(let review of reviews) {
            let reviewImages = await ReviewImage.findAll({
                where:{ reviewId: review.id},
                attributes: {
                    exclude: ["reviewId", "createdAt", "updatedAt"]
                }
            });
            let user = await User.findByPk(spot.ownerId);

            review.dataValues.User = user;
            review.dataValues.ReviewImages = reviewImages;

        }


        return res.json({
            Reviews: reviews
        });

    }

);


// create review by spotId
router.post(
    '/spots/:spotId/reviews',
    requireAuth,
    async (req, res) => {

        const spotId = req.params.spotId;
        const {review, stars} = req.body;

        const err = new Error();
        err.statusCode = 400;
        err.errors = [];


        if (!review) {
            err.errors.push(["review", "Review text is required"]);
        }

        if (!stars) {
            err.errors.push(["stars", "Stars must be an integer from 1 to 5"]);
        }


        if(err.errors.length) {
            err.errors = Object.fromEntries(err.errors)
            return res.status(err.statusCode).json(err)
        }


        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            const err = new Error();
            err.message = `Spot couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }

        const reviews = Review.findAll({
            where: {
                userId: req.user.id,
                spotId: spotId
            }
        })

        if (reviews.length > 0) {
            const err = new Error();
            err.message = "User already has a review for this spot";
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }




        let newReview = await Review.create({
            userId: req.user.id,
            spotId,
            review,
            stars
        })

        return res.status(200).json(await Review.findByPk(newReview.id));

    }
);

// add image to review by id
router.post(
    '/reviews/:reviewId/images',
    requireAuth,
    async (req, res) => {

        const reviewId = req.params.reviewId;
        const { url } = req.body;

        const review = await Review.findByPk(reviewId);

        if (!review) {
            const err = new Error();
            err.message = `Review couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }


        if(review.userId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        const images = await ReviewImage.findAll({
            where: {
                reviewId: reviewId
            }
        })

        if (images.length >= 10) {
            const err = new Error();
            err.message = "Maximum number of images for this resource was reached";
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }


        const reviewImage = await ReviewImage.create({
            reviewId,
            url
        });

        return res.status(200).json(await ReviewImage.findByPk(reviewImage.id, {
            attributes: {
                exclude: ["id", "createdAt", "updatedAt"]
            }}))
    }
);



router.put(
    '/reviews/:reviewId',
    requireAuth,
    async (req, res) => {

        const reviewId = req.params.reviewId;
        const { review, stars } = req.body;

        const err = new Error();
        err.statusCode = 400;
        err.message = 'Validation Error';
        err.errors = [];


        if (!review) err.errors.push(["review", "Review text is required"]);
        if (!stars) err.errors.push([ "stars", "Stars must be an integer from 1 to 5"]);

        if(err.errors.length) {
            err.errors = Object.fromEntries(err.errors)
            return res.status(err.statusCode).json(err)
        }



        const revObj = await Review.findByPk(reviewId);

        if (!revObj) {
            const err = new Error();
            err.message = `Review couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }


        if(revObj.userId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        await Review.update({
            review,
            stars
        }, {
            where: {
                id: reviewId
            }
        });

        return res.status(200).json(await Review.findByPk(reviewId));

    }
);

router.delete(
    '/reviews/:reviewId',
    requireAuth,
    async (req, res) => {

        const reviewId = req.params.reviewId;

        const revObj = await Review.findByPk(reviewId);

        if (!revObj) {
            const err = new Error();
            err.message = `Review couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }


        if(revObj.userId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        await Review.destroy({
            where: {
                id: reviewId
            }
        })

        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });

    }
);


module.exports = router;
