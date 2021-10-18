const express = require('express');
const path = require("path");
const db = require("./db/knex");

const app = express();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}
app.get('/meme', (req, res) => {
    res.send('gig');
})
const port = process.env.PORT || 4000;


(async() => {
    try {
        console.log("Running migrations...");
        await db.migrate.latest();

        console.log("Starting express...");
        app.listen(port, () => {
            console.log(`App listening on port ${port}!`);
        });
    } catch (err) {
        console.error("Error starting app!", err);
        process.exit(-1);
    }
})();