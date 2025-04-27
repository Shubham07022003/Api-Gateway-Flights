const dotenv =require('dotenv');
dotenv.config();
//const PORT = process.env.PORT;
module.exports ={
    PORT:process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
}