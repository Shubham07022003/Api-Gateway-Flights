const{userService} = require ('./../services');
//const{StatusCodes}= require('http-status-codes');

const{ErrorResponse, SuccessResponse}= require('../utils/common');
const { StatusCodes } = require('http-status-codes');
//POST: /cities
//req-body {name: 'london}
async function signup (req ,res){
    try {
        //console.log(req.body);
        const user = await userService.createUser({
            
            email: req.body.email,
            password: req.body.password
        }
    );
        SuccessResponse.data = user;
        return res.json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
        .status(error.statusCode)
         .json(ErrorResponse);

    }
}

module.exports= {
    signup
}