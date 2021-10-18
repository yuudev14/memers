const express = require('express');

const app = express();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
}
app.get('/meme', (req, res) => {
    res.send('gi');
})
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening to port ${port}`);
});