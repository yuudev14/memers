const jwt = require("jsonwebtoken");

//verify if token is still active or not
module.exports = (req, res, next) => {
    const { token } = req.headers;
    if (!token) return res.status(403).send("no token available")
    try {
        const verify = jwt.verify(token, process.env.jwtsecret);
        res.locals.user = verify.user;
        next();
    } catch (error) {
        return res.status(403).send("token is expired")
    }

}