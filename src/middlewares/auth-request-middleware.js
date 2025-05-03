const{StatusCodes}= require('http-status-codes')
const{ErrorResponse} = require('../utils/common');
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

module.exports= {
    validateAuthRequest
}