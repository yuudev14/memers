const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (user_id) => {
    try {
        const payload = {
            user: user_id
        }
        return jwt.sign(payload, process.env.jwtsecret, { expiresIn: '1day' })


    } catch (error) {
        console.log(error);
    }
}

module.exports = generateToken;