const bcrypt = require('bcrypt');
const db = require('../../db/knex');
const generateToken = require("../../utils/generateToken");

const signUp = async(req, res) => {
    try {
        const { username, email, password } = req.body;
        if (username.length < 7) return res.status(403).send('username length must be greater than 7');
        if (password.length < 7) return res.status(403).send('password length should be greater than 7');
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = await db
            .insert({ username, email, password: hash })
            .returning("id")
            .into("users")
        const token = generateToken(user[0]);
        res.send({ token });
    } catch (error) {
        if (error.constraint === "users_username_unique") {
            return res.status(403).send("username already exist")
        }
        if (error.constraint === "users_email_unique") {
            return res.status(403).send("email already exist")
        }
        console.log(error);
    }
}

const signIn = async(req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const user = await db("users")
            .where({ username: usernameOrEmail })
            .orWhere({ email: usernameOrEmail })
            .select(["id", "password"]);
        if (user) {
            const userPassword = user[0].password;
            const userId = user[0].id;
            const result = await bcrypt.compare(password, userPassword);
            const token = generateToken(userId);
            if (result) return res.send({ token })
            return res.status(403).send("wrong password");
        } else {
            return res.status(403).send("can't find user")
        }
    } catch (error) {
        console.log(error);
    }
}

const isVerify = (req, res) => {
    try {
        res.send(res.locals.user && true);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signUp,
    signIn,
    isVerify,
}