const express = require("express");
const memes = require("./controllers/memesController");
const verifyToken = require("../middlewares/verifyToken");

const route = express.Router();

route.use(verifyToken);
route.get('/', memes.allMemes);
route.post('/', memes.addMeme);
route.post('/laugh/:id', memes.laughAtMeme);
route.delete('/:id', memes.laughAtMeme);
route.patch('/:id', memes.laughAtMeme);

module.exports = route;