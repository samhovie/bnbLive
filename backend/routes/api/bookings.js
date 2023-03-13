// backend/routes/api/bookings.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Booking, Spot, User, SpotImage} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { up } = require('../../db/migrations/20230221234416-create-review');
const { Op } = require('sequelize');


const router = express.Router();


// Bookings of current user
router.get(
    '/bookings/current',
    requireAuth,
    async (req, res) => {

        const userId = req.user.id;

        const bookings = await Booking.findAll({
            where: {
                userId: userId
            }
        })

        for(let booking of bookings) {
            const spot = await Spot.findByPk(booking.spotId,{
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"]
                }
            })

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


            booking.dataValues.Spot = spot;
        }

        return res.status(200).json(bookings);
    }
);

// Bookings by spotId
router.get(
    '/spots/:spotId/bookings',
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

        let attributes = {}

        if(req.user.id !== spot.ownerId) {
            attributes = { exclude: ["id", "userId", "createdAt", "updatedAt"] }
        }

        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes
        })

        if (req.user.id === spot.ownerId) {
            let user = await User.findByPk(req.user.id, {
                attributes: {
                    exclude: ["username"]
                }
            });
            for (let booking of bookings) {
                booking.dataValues.User = user;
            }
        }

        return res.status(200).json({
            Bookings: bookings
        })

    }
);

// Create booking by spotId
router.post(
    '/spots/:spotId/bookings',
    requireAuth,
    async (req, res) => {

        let { startDate, endDate } = req.body;
        const spotId = req.params.spotId;
        const userId = req.user.id;


        const spot = await Spot.findByPk(spotId);

        if (!spot) {
            const err = new Error();
            err.message = `Spot couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }

        // Spot must NOT belong to the current user
        if (req.user.id === spot.ownerId) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        // let startDateObj = new Date()
        startDate = new Date(startDate).toDateString();
        startDate = new Date(startDate).getTime();

        endDate = new Date(endDate).toDateString();
        endDate = new Date(endDate).getTime();

        if (endDate <= startDate) {
            const err = new Error();
            err.message = 'Validation Error';
            err.statusCode = 400;
            err.errors = { endDate: "endDate cannot be on or before startDate" }
            return res.status(err.statusCode).json(err);
        }

        const bookings = await Booking.findAll({
            where: {
                spotId: spotId
            }
        })

        let startConflict = false;
        let endConflict = false;

        for (let booking of bookings) {

            let bookingStart = new Date(booking.startDate).toDateString();
            bookingStart = new Date(bookingStart).getTime();

            let bookingEnd = new Date(booking.endDate).toDateString();
            bookingEnd = new Date(bookingEnd).getTime();

            if (endDate >= bookingStart && endDate <= bookingEnd) {
                endConflict = true;
            }

            if (startDate >= bookingStart && startDate <= bookingEnd) {
                startConflict = true;
            }
        }

        const err = new Error();
        err.message = 'Sorry, this spot is already booked for the specified dates';
        err.statusCode = 403;
        err.errors = [];

        if(startConflict) {
            err.errors.push(["startDate", "Start date conflicts with an existing booking"])
        }
        if (endConflict) {
            err.errors.push(["endDate", "End date conflicts with an existing booking"])
        }

        if(err.errors.length) {
            err.errors = Object.fromEntries(err.errors)
            return res.status(err.statusCode).json(err)
        }

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        const booking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate
        });

        return res.status(200).json(await Booking.findByPk(booking.id));

    }
);

// Edit booking by id
router.put(
    '/bookings/:bookingId',
    requireAuth,
    async (req, res) => {

        const bookingId = req.params.bookingId;

        let { startDate, endDate } = req.body;
        const booking = await Booking.findByPk(bookingId);

        const spotId = booking.spotId;

        if (!booking) {
            const err = new Error();
            err.message = `Booking couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }

        if(booking.userId !== req.user.id) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }


        // let startDateObj = new Date()
        startDate = new Date(startDate).toDateString();
        startDate = new Date(startDate).getTime();

        endDate = new Date(endDate).toDateString();
        endDate = new Date(endDate).getTime();

        if (endDate <= startDate) {
            const err = new Error();
            err.message = 'Validation Error';
            err.statusCode = 400;
            err.errors = { endDate: "endDate cannot be on or before startDate" }
            return res.status(err.statusCode).json(err);
        }


        // can't edit booking that's ended
        let today = new Date().toDateString();
        today = new Date(today).getTime();
        // strip seconds
        let currentEnd = booking.endDate.toDateString();
        currentEnd = new Date(currentEnd).getTime();

        if (currentEnd <= today) {
            const err = new Error();
            err.message = `Past bookings can't be modified`;
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        // don't want to compare with itself
        const bookings = await Booking.findAll({
            where: {
                [Op.and]: {
                    spotId: spotId,
                    id: {[Op.ne]: bookingId}
                }
            }
        })

        let startConflict = false;
        let endConflict = false;

        for (let booking of bookings) {

            let bookingStart = new Date(booking.startDate).toDateString();
            bookingStart = new Date(bookingStart).getTime();

            let bookingEnd = new Date(booking.endDate).toDateString();
            bookingEnd = new Date(bookingEnd).getTime();

            if (endDate >= bookingStart && endDate <= bookingEnd) {
                endConflict = true;
            }

            if (startDate >= bookingStart && startDate <= bookingEnd) {
                startConflict = true;
            }
        }

        const err = new Error();
        err.message = 'Sorry, this spot is already booked for the specified dates';
        err.statusCode = 403;
        err.errors = [];

        if(startConflict) {
            err.errors.push(["startDate", "Start date conflicts with an existing booking"])
        }
        if (endConflict) {
            err.errors.push(["endDate", "End date conflicts with an existing booking"])
        }

        if(err.errors.length) {
            err.errors = Object.fromEntries(err.errors)
            return res.status(err.statusCode).json(err)
        }

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        await Booking.update({
            startDate,
            endDate
        }, {
            where: {
                id: bookingId
            }
        });

        return res.status(200).json(await Booking.findByPk(bookingId));

    }
);


router.delete(
    '/bookings/:bookingId',
    requireAuth,
    async (req, res) => {

        const bookingId = req.params.bookingId;
        const booking = await Booking.findByPk(bookingId);
        const spot = await Spot.findByPk(booking.spotId);

        if (!booking) {
            const err = new Error();
            err.message = `Booking couldn't be found`;
            err.statusCode = 404;
            return res.status(err.statusCode).json(err);
        }

        if(booking.userId !== req.user.id && spot.ownerId !== req.user.id ) {
            const err = new Error();
            err.message = 'Forbidden';
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }



        // can't edit booking that's ended
        // let today = new Date().toDateString();
        // today = new Date(today).getTime();

        const start = Date.now()
        let today = new Date(start).toDateString();
        today = new Date(today).getTime();

        // strip seconds
        let currentStart = new Date(booking.startDate).toDateString();
        currentStart = new Date(currentStart).getTime();

        if (currentStart <= today) {
            const err = new Error();
            err.message = `Bookings that have been started can't be deleted`;
            err.statusCode = 403;
            return res.status(err.statusCode).json(err);
        }

        await Booking.destroy({
            where: {
                id: bookingId
            }
        })

        return res.json({
            message: "Successfully deleted",
            statusCode: 200
          })



    }
);






module.exports = router;
