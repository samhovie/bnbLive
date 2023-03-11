// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


// Sign up
router.post(
    '/',
    async (req, res) => {
      const { email, firstName, lastName, password, username } = req.body;

      const emails = await User.findAll({where: { email: email }});
      const usernames = await User.findAll({where: { username: username }});

      const err = new Error();
      err.errors  = []

      if(emails.length) {
        err.message = 'User already exists'
        err.statusCode = 403
        err.errors.push([ "email", "User with that email already exists"])
      }

      if(usernames.length) {
        err.message = 'User already exists'
        err.statusCode = 403;
        err.errors.push([ "username", "User with that username already exists"])
      }

      if(err.errors.length) {
        err.errors = Object.fromEntries(err.errors)
        return res.status(err.statusCode).json(err)
    }

      if(!firstName) {
        err.message = 'Validation Error';
        err.statusCode = 400;
        err.errors.push(['firstName', 'First Name is required'])
      }

      if(!lastName) {
        err.message = 'Validation Error';
        err.statusCode = 400;
        err.errors.push(['lastName', 'Last Name is required'])
      }

      if(!username) {
        err.message = 'Validation Error';
        err.statusCode = 400;
        err.errors.push(['username', 'Username is required'])
      }

      if(!email) {
        err.message = 'Validation Error';
        err.statusCode = 400;
        err.errors.push(['email', 'Invalid email'])
      }

      if(err.errors.length) {
        err.errors = Object.fromEntries(err.errors)
        res.status(err.statusCode).json(err)
      }

      let user = await User.signup({ firstName, lastName, email, username, password });

      // user.dataValues.token = setTokenCookie(res, user);

      return res.status(200).json(user.dataValues);

    }
  );


  const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, firstName, lastName, password, username } = req.body;
    const user = await User.signup({ email, firstName, lastName, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user: user
    });
  }
);

module.exports = router;
