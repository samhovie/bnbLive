// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Log in
router.post(
    '/',
    async (req, res, next) => {
      const { credential, password } = req.body;
      const err = new Error()
      err.message = 'Validation Error'
      err.statusCode = 400
      err.errors = []

      if (!credential) {
        err.errors.push(['credential', 'Email or username is required'])
        console.log(credential)
      }
      if (!password) err.errors.push(['password', 'Password is required'])

      if(err.errors.length) {
        err.errors = Object.fromEntries(err.errors)
        return res.status(err.statusCode).json(err)
      }

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error();
        err.statusCode = 401;
        err.message = 'Invalid credentials' ;
        return res.status(err.statusCode).json(err);
      }

      setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
);

router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);


// Restore session user
router.get(
    '/',
    restoreUser,
    // requireAuth,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.status(200).json({ user: null });
    }
  );

  const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

// Log in
router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      // err.title = 'Login failed';
      err.errors = { credential: 'Invalid credentials' };
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.status(200).json({
      user: user
    });
  }
);

module.exports = router;
