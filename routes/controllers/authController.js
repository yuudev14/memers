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
            .returning(["id", "username", "date", "email"])
            .into("users")
        const token = generateToken(user[0].id);
        delete user[0].id
        return res.send({ token, userInfo: user[0] })
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
            .select("*");
        if (user.length) {
            const userPassword = user[0].password;
            const userId = user[0].id;
            const result = await bcrypt.compare(password, userPassword);
            const token = generateToken(userId);

            const userToBeSend = user[0];
            delete userToBeSend.id;
            delete userToBeSend.password
            if (result) return res.send({ token, userInfo: userToBeSend })
            return res.status(403).send("wrong password");
        } else {
            return res.status(403).send("can't find user")
        }
    } catch (error) {
        console.log(error);
    }
}

const isVerify = async(req, res) => {
    try {
        const user = await db("users")
            .where({ id: res.locals.user })
            .select(["username", "email", "date"]);
        res.send(user);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signUp,
    signIn,
    isVerify,
}