const db = require("../../db/knex");

const addMeme = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const { status, media } = req.body;
        if (!media) return res.status(403).send("should pick some media");
        const createMeme = await db
            .insert({ status, media, user_id })
            .returning("*")
            .into("memes");
        res.send(createMeme);
    } catch (error) {
        console.log(error);
    }
}

const deleteMeme = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
    } catch (error) {
        console.log(error);

    }
}

const updateMeme = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
    } catch (error) {
        console.log(error);

    }
}

const laughAtMeme = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const { id } = req.params;
        const ifExist = await db
            .select("")
            .from("laughs")
            .where({ meme_id: id })
            .andWhere({ user_id });
        console.log(ifExist);

    } catch (error) {
        console.log(error);

    }
}
const allMemes = async(req, res) => {
    try {
        const memes = await db()
    } catch (error) {
        console.log(error);

    }
}


module.exports = {
    addMeme,
    allMemes,
    deleteMeme,
    updateMeme,
    laughAtMeme,
}