const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
//const JWT_SECRET = process.env.JWT_SECRET;
dotenv.config({ path: path.join(__dirname, '../../.env') });

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET not found in environment variables');
    process.exit(1);
}

module.exports = {
    PORT: process.env.PORT,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY
}