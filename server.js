const express = require('express');
const path = require("path");
const db = require("./db/knex");

const app = express();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}
app.get('/meme', async(req, res) => {
    try {
        const x = await db.select().table("x");
        res.send(x);

    } catch (error) {

    }

})
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});