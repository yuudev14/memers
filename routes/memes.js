const express = require("express");
const memes = require("./controllers/memesController");
const verifyToken = require("../middlewares/verifyToken");

const route = express.Router();

route.post('/add', verifyToken, memes.addMeme);

module.exports = route;