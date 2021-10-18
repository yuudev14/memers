const express = require('express');
const path = require("path");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}


app.use('/auth', require("./routes/auth"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});