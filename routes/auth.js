const express = require("express");
const auth = require("./controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

const route = express.Router();

route.get('/', verifyToken, auth.isVerify);
route.post('/sign-up', auth.signUp);
route.post('/sign-in', auth.signIn);

module.exports = route;