// backend/routes/api/images.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ReviewImage, SpotImage, Spot, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// router.get('/', async (req, res) => {
//     res.sendFile('/favicon.png')
// })

// get reviews of current user
router.delete(
    '/spot-images/:imageId',
    requireAuth,
    async (req, res) => {
        const imageId = req.params.imageId;
        const spotImage = await SpotImage.findByPk(imageId, {
            attributes: {
                include: [ 'id', 'url', 'preview', 'spotId' ]
            }
        });
        const spot = await Spot.findByPk(spotImage.spotId);

        if (!spotImage) {
            const err = new Error();
            err.message = `Spot Image couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }


        if(spot.ownerId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        await SpotImage.destroy({
            where: {
                id: imageId
            }
        })

        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
          })
    }
);

// get reviews of current user
router.delete(
    '/review-images/:imageId',
    requireAuth,
    async (req, res) => {

        const imageId = req.params.imageId;
        const reviewImage = await ReviewImage.findByPk(imageId);

        const review = await  Review.findByPk(reviewImage.reviewId)


        if (!reviewImage) {
            const err = new Error();
            err.message = `Review Image couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }

        if(review.userId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        await ReviewImage.destroy({
            where: {
                id: imageId
            }
        })

        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }
);


module.exports = router;
