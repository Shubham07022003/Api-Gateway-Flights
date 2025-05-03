//const{ServerConfig}= require('../../config')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../errors/app.error');    
const {ServerConfig} = require('../../config');
 function checkPassword(plainPassword, encryptedPassword){
    try {
        return bcrypt.compareSync(plainPassword, encryptedPassword);
    } catch (error) {
        throw error;
    }
}

function createToken(input) {
    try {
        if (!ServerConfig.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign(input, ServerConfig.JWT_SECRET, {expiresIn: ServerConfig.JWT_EXPIRY});
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports= {
    checkPassword,
    createToken
}