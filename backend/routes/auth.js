const express = require('express');
const router = express.Router();
// const { googleAuth } = require('../controllers/authController');
const {googleAuth}=require('../controllers/auth')

router.get("/google", googleAuth);

exports.router = router;