const { StatusCodes } = require('http-status-codes');
const{Auth} = require('../utils/common');
const {UserRepository} = require('./../repositories');
const AppError = require('../utils/errors/app.error');
const userRepo = new UserRepository();
async function createUser(data) {
    try{
        const user = await userRepo.create(data);
        return user ;

    }catch(error){
        console.log (error)
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError' ){
            let explanation =[];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            console.log(explanation);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        //throw error;
        throw new AppError('cannot create a new user object', StatusCodes.INTERNAL_SERVER_ERROR)

    }

}
async function signin(data){
    try {
        const user = await userRepo.getUserByEmail(data.email);
        if(!user){
            throw new AppError('no user found for the given email', StatusCodes.NOT_FOUND);
        }
        const passWordMatch = Auth.checkPassword(data.password , user.password)
        console.log("password match", passWordMatch);
        if(!passWordMatch){
            throw new AppError('password is not correct', StatusCodes.UNAUTHORIZED);
        }
        const jwt = Auth.createToken({id: user.id, email: user.email});
        return jwt;
    } catch (error) {
        console.log(error);
        if(error instanceof AppError)throw error;
        throw  new AppError('error while signing in the user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function isAuthenticated(token){
    try{
        if(!token){
            throw new AppError('missing JWT tocken', StatusCodes.BAD_REQUEST);

        }
        const response = Auth.verifyToken(token);
        const user = await userRepo.get(response.id);
        if(!user){
            throw new AppError('no user found for this token', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch(error){
        console.log(error);
        if(error instanceof AppError)throw error;
        if(error.name== 'JsonwebTokenError'){
        throw new AppError('error while verifying the token', StatusCodes.BAD_REQUEST);
        }
        if(error.name== 'TokenExpiredError'){
            throw new AppError(' token is expired', StatusCodes.BAD_REQUEST);
            }
        console.log(error);
        throw error;
    }
}


module.exports = {
    createUser,
    signin,
    isAuthenticated
}