const express = require('express');
const router = express.Router();

const { login } = require('../controllers/authController');

router.post('/loginn', login);
const {
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;