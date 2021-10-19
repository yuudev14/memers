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
        const { id: meme_id } = req.params;
        const ifExist = await db
            .select("")
            .from("laughs")
            .where({ meme_id })
            .andWhere({ user_id });
        if (!ifExist.length) {
            await db("laughs")
                .insert({ meme_id, user_id });
            res.send(true);
        } else {
            await db
                .delete()
                .from("laughs")
                .where({ meme_id })
                .andWhere({ user_id });
            res.send(false);
        }

    } catch (error) {
        console.log(error);

    }
}
const allMemes = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const counts = db("laughs")
            .count("meme_id")
            .whereRaw("memes.id = laughs.meme_id")
            .as("laugh");
        const isUser = db("laughs")
            .count("user_id")
            .where({ user_id })
            .andWhereRaw("memes.id = laughs.meme_id")
            .as("isUser");
        const memes = await db
            .select("*", counts, isUser)
            .from("memes");
        res.send(memes);
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