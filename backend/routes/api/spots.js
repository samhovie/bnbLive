// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Spot, SpotImage, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


// All Spots
router.get(
    '/',
    // validateSignup,
    async (req, res) => {

        const err = new Error()
        err.message = 'Validation Error';
        err.errors = []

        let query = {
            // where: {
            //     [Op.and]: [
            //     //   { authorId: 12 },
            //     //   { status: { [Op.like]: `%${req.query.firstName}%` } }
            //     ]
            // },
            where: [], // change to
            include: []
        };

        let { page, size, maxLat, minLat, minLng, maxLng, minPrice, maxPrice } = req.query;

        if (!page) page = 1;
        if (!size) size = 20;

        page = parseInt(page);
        size = parseInt(size);

        if (page < 1) {
            err.errors.push(["page", "Page must be greater than or equal to 1"])
        }
        if (size < 1) {
            err.errors.push(["size", "Size must be greater than or equal to 1"])
        }

        // this right?
        if (page > 10) {
            page = 10;
        }
        if (size > 20) {
            size = 20
        }



        const pagination = {};
        if (page >= 1 && size >= 1) {
            pagination.limit = size;
            pagination.offset = size * (page - 1);
        }



        if (req.query.maxLat) {
            // validate
            let maxLat = parseFloat(req.query.maxLat);
            if(Number.isNaN(maxLat)) {
                err.errors.push(["maxLat", "Maximum latitude is invalid"])
            }
            // add to where
            query.where.push({lat: { [Op.lte]: maxLat }})
        }


        if (req.query.minLat) {
            // validate
            let minLat = parseFloat(req.query.minLat);
            if(Number.isNaN(minLat)) {
                err.errors.push(["minLat", "Minimum latitude is invalid"])
            }
            // add to where
            query.where.push({lat: { [Op.gte]: minLat }})
        }


        if (req.query.maxLng) {
            // validate
            let maxLng = parseFloat(req.query.maxLng);
            if(Number.isNaN(maxLng)) {
                err.errors.push(["maxLng", "Maximum longitude is invalid"])
            }
            // add to where
            query.where.push({lng: { [Op.lte]: maxLng }})
        }


        if (req.query.minLng) {
            // validate
            let minLng = parseFloat(req.query.minLng);
            if(Number.isNaN(minLng)) {
                err.errors.push(["minLng", "Minimum longitude is invalid"])
            }
            // add to where
            query.where.push({lng: { [Op.gte]: minLng }})
        }

        if (req.query.minPrice) {
            // validate
            let minPrice = parseFloat(req.query.minPrice);
            if(Number.isNaN(minPrice) || minPrice < 0) {
                err.errors.push(["minPrice", "Minimum price must be greater than or equal to 0"])
            }
            // add to where
            query.where.push({price: { [Op.gte]: minPrice }})
        }


        if (req.query.maxPrice) {
            // validate
            let maxPrice = parseFloat(req.query.maxPrice);
            if(Number.isNaN(maxPrice) || maxPrice < 0) {
                err.errors.push(["maxPrice", "Maximum price must be greater than or equal to 0"])
            }
            // add to where
            query.where.push({price: { [Op.lte]: maxPrice }})
        }


        if (query.where.length > 0) {
            query.where = {
                [Op.and]: query.where
            }
        }



        let spots = await Spot.findAll({
            // order: [['lastName'], ['firstName']],
            // attributes: ['id', 'firstName', 'lastName'],
            // include: [{
            //     model: Band,
            //     attributes: ['id', 'name']
            // }],

            query,
            ...pagination

        });



        // add avg rating to each spot
        for (let spot of spots) {
            // get all reviews

            let reviews = await Review.findOne({
                where: {
                    spotId: spot.id
                },
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            })

            if (reviews.dataValues.avgRating ) {
                spot.dataValues.avgRating =
                Number.parseFloat(reviews.dataValues.avgRating).toFixed(1);
            } else {
                spot.dataValues.avgRating = 'New'
            }

            let spotImage = await SpotImage.findOne({
                where: {
                    [Op.and]: {
                        spotId: spot.id,
                        preview: true
                    }
                }
            });

            if (spotImage) {
                spot.dataValues.previewImage = spotImage.url
            }
            else {
                spot.dataValues.previewImage = 'none'
            }





        }




        return res.status(200).json({
            Spots: spots,
            page: page,
            size: size
        });
    }
  );


  // Spots of current user
router.get(
    '/current',
    requireAuth,
    async (req, res) => {

        let spots = await Spot.findAll({
            where: {
                ownerId: req.user.id
            }
        })

        // add avg rating to each spot
        for (let spot of spots) {
            // get all reviews

            let reviews = await Review.findOne({
                where: {
                    spotId: spot.id
                },
                attributes: [
                    [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
                ]
            })

            if (reviews.dataValues.avgRating ) {
                spot.dataValues.avgRating =
                Number.parseFloat(reviews.dataValues.avgRating).toFixed(1);
            } else {
                spot.dataValues.avgRating = 'New'
            }



            let spotImage = await SpotImage.findOne({
                where: {
                    [Op.and]: {
                        spotId: spot.id,
                        preview: true
                    }
                }
            });

            if (spotImage) {
                spot.dataValues.previewImage = spotImage.url
            }
            else {
                spot.dataValues.previewImage = 'none'
            }





        }

        return res.status(200).json({
            Spots: spots
        });

    }
  );

// Spots by id
router.get(
    '/:spotId',
    // validateSignup,
    async (req, res) => {

        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId)

        if(!spot) {
            res.status(404).json({
                message: "Spot couldn't be found",
                statusCode: 404
            });
        }

        let reviewAvg = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
            ]
        })
        if (reviewAvg.dataValues.avgStarRating ) {
            spot.dataValues.avgStarRating =
            Number.parseFloat(reviewAvg.dataValues.avgStarRating).toFixed(1);
        } else {
            spot.dataValues.avgStarRating = 'No ratings yet'
        }


        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        spot.dataValues.numReviews = reviews.length;


        spot.dataValues.SpotImages =
            await SpotImage.findAll({
                where : {
                    spotId: spotId
                }
            });

        spot.dataValues.Owner =
            await User.findByPk(spot.ownerId);




        return res.status(200).json(
            spot
        );

    }
  );

// Create spot
router.post(
    '/',
    requireAuth,
    async (req, res) => {

        const { address, city, state,
               country, lat, lng, name, description, price} = req.body;
        const NAME_LIMIT = 50;
        const err = new Error();
        err.message = 'Validation Error'
        err.statusCode = 400;
        err.errors = [];

        if (!address) err.errors.push(["address", "Street address is required"]);
        if (!city)  err.errors.push(["city", "City is required"]);
        if (!state) err.errors.push(["state", "State is required"]);
        if (!country) err.errors.push(["country", "Country is required"]);
        if (!lat) err.errors.push(["lat", "Latitude is not valid"]);
        if (!lng) err.errors.push(["lng", "Longtude is not valid"]);
        if (name.length > NAME_LIMIT) err.errors.push(["name", "Name must be less than 50 characters"]);
        if (!description) err.errors.push(["description", "Description is required"]);
        if (!price) err.errors.push(["price", "Price per day is required"]);

        if(err.errors.length) {
            err.errors = Object.fromEntries(err.errors)
            return res.status(err.statusCode).json(err)
        }

        const spot = await Spot.create({
            ownerId: req.user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
          });
        //   return await User.scope('currentUser').findByPk(user.id);
        return res.status(201).json(await Spot.findByPk(spot.id))

    }
  );



// Add spot image by id
router.post(
    '/:spotId/images',
    requireAuth,
    async (req, res) => {

        const { url, preview } = req.body;
        const spotId = req.params.spotId;

        let spot = await Spot.findByPk(spotId)
        if (!spot) {
            const err = new Error();
            err.message = `Spot couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }
        if(spot.ownerId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }


        const spotImage = await SpotImage.create({
            spotId: spotId,
            url: url,
            preview: preview
        })

        return res.status(200).json(await SpotImage.findByPk(spotImage.id))


    }
);

// Edit spot
router.put(
    '/:spotId',
    requireAuth,
    async (req, res) => {


        const { address, city, state,
            country, lat, lng, name, description, price} = req.body;

        let spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            const err = new Error();
            err.message = `Spot couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }
        if(spot.ownerId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }


        const NAME_LIMIT = 50;
        const err = new Error();
        err.message = 'Validation Error'
        err.statusCode = 400;
        err.errors = [];

        if (!address) err.errors.push(["address", "Street address is required"]);
        if (!city)  err.errors.push(["city", "City is required"]);
        if (!state) err.errors.push(["state", "State is required"]);
        if (!country) err.errors.push(["country", "Country is required"]);
        if (!lat) err.errors.push(["lat", "Latitude is not valid"]);
        if (!lng) err.errors.push(["lng", "Longtude is not valid"]);
        if (name.length > NAME_LIMIT) err.errors.push(["name", "Name must be less than 50 characters"]);
        if (!description) err.errors.push(["description", "Description is required"]);
        if (!price) err.errors.push(["price", "Price per day is required"]);

        if(err.errors.length) {
            err.errors = Object.fromEntries(err.errors)
            return res.status(err.statusCode).json(err)
        }

        const spotUpdate = await Spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
          }, {
            where: {
              id: spotId
            }
          });
        //   return await User.scope('currentUser').findByPk(user.id);
        return res.status(200).json(await Spot.findByPk(spotId))

    }
);


// Delete spot
router.delete(
    '/:spotId',
    requireAuth,
    async (req, res) => {

        const spotId = req.params.spotId;
        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            const err = new Error();
            err.message = `Spot couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }

        if(spot.ownerId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }




        await Spot.destroy({
            where: {
              id: spotId
            }
        });


        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        });


    }
);




  module.exports = router;
