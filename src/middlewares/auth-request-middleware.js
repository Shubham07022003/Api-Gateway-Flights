const{StatusCodes}= require('http-status-codes')
const{ErrorResponse} = require('../utils/common');
const{userService} = require('../services')
const AppError = require('../utils/errors/app.error');
function validateAuthRequest(req, res,next){
    if(!req.body.email){
        ErrorResponse.message= 'something went wrrong authenticate user';
       // new AppError(['Model number not found in oncoming request in the correct form'],StatusCodes.BAD_REQUEST )
        ErrorResponse.error=  new AppError(['email not found in oncoming request in the correct form'],StatusCodes.BAD_REQUEST ) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.password){
        ErrorResponse.message= 'something went wrrong authenticate user';
       // new AppError(['Model number not found in oncoming request in the correct form'],StatusCodes.BAD_REQUEST )
        ErrorResponse.error=  new AppError(['password not found in oncoming request in the correct form'],StatusCodes.BAD_REQUEST ) ;
        return res
        .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const response =  await userService.isAuthenticated(req.headers['x-access-token']);
        if(response){
            req.user= response;
            next();
        }
    } catch (error) {
        return res
        .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json(error);
    }
}

module.exports= {
    validateAuthRequest,
    checkAuth
}