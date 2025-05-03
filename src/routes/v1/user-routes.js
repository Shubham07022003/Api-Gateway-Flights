const express = require('express');
const router = express.Router();
const {userController}  = require('./../../controllers');
const {AuthRequestMiddlewares}= require('../../middlewares')
const { StatusCodes } = require('http-status-codes');

router.post('/signup' , AuthRequestMiddlewares.validateAuthRequest  , userController.signup);
router.post('/signin', AuthRequestMiddlewares.validateAuthRequest ,  userController.signin);

module.exports = router;