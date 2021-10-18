const express = require("express");
const auth = require("./controllers/authController");


const route = express.Router();

route.post('/sign-up', auth.signUp);
route.post('/sign-in', auth.signIn);

module.exports = route;