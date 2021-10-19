const express = require('express');
const path = require("path");

const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}

// route for authentication
app.use('/auth', require("./routes/auth"));

//route fro  memes
app.use('/memes', require("./routes/memes"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});