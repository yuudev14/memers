const db = require("../../db/knex");
const cloudinary = require("../../utils/cloudinary");
const addMeme = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const { status, media } = req.body;
        const uploadRequest = await cloudinary.uploader.upload(media, {
            upload_preset: "memers"
        })
        const secure_url = uploadRequest.secure_url;
        if (!media) return res.status(403).send("should pick some media");
        const createMeme = await db
            .insert({ status, media: secure_url, user_id })
            .returning("id")
            .into("memes");

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
            .select("memes.*", counts, isUser, "users.username")
            .from("memes")
            .leftJoin('users', 'users.id', 'memes.user_id')
            .whereRaw("memes.id = ?", [createMeme[0]])
            .orderBy("date", "desc");
        res.send(memes);
    } catch (error) {
        console.log(error.error);
        res.status(403).send("insert a valid image or gif");
    }
}

const deleteMeme = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const { id } = req.params;
        await db
            .delete()
            .from("laughs")
            .where({ meme_id: id })
        await db
            .delete()
            .from("memes")
            .where({ id })
            .andWhere({ user_id });
        res.send({ id });
    } catch (error) {
        console.log(error);
    }
}

const updateMeme = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const { id } = req.params;
        const { status } = req.body;
        const updatedMeme = await db("memes")
            .where({ id })
            .andWhere({ user_id })
            .update({ status }, ["*"])
        if (!updatedMeme.length) return res.status(403).send("meme doesn't exist")
        res.send(updatedMeme);
    } catch (error) {
        console.log(error);

    }
}

const addComment = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const { id: meme_id } = req.params;
        const { comment } = req.body;
        const commentId = await db
            .insert({ meme_id, user_id, comment })
            .returning("id")
            .from("comments");


        const commentData = await db("comments")
            .select(["comments.*", "users.username"])
            .leftJoin("users", "users.id", "comments.user_id")
            .whereRaw("comments.id = ?", [commentId[0]])
        res.send(commentData[0]);

    } catch (error) {
        console.log(error);
    }
}

const viewComment = async(req, res) => {
    try {
        const { id: meme_id } = req.params;

        const commentData = await db("comments")
            .select(["comments.*", "users.username"])
            .leftJoin("users", "users.id", "comments.user_id")
            .orderBy("comments.date", "desc")
            .whereRaw("comments.meme_id = ?", [meme_id])
        res.send(commentData);

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
            res.send({ isUser: "1", meme_id });
        } else {
            await db
                .delete()
                .from("laughs")
                .where({ meme_id })
                .andWhere({ user_id });
            res.send({ isUser: "0", meme_id });
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
            .select("memes.*", counts, isUser, "users.username")
            .from("memes")
            .leftJoin('users', 'users.id', 'memes.user_id')
            .orderBy("date", "desc")
        res.send(memes);
    } catch (error) {
        console.log(error);

    }
}

const singleMemes = async(req, res) => {
    try {
        const { user: user_id } = res.locals;
        const { id: meme_id } = req.params;
        const counts = db("laughs")
            .count("meme_id")
            .whereRaw("memes.id = laughs.meme_id")
            .as("laugh");
        const isUser = db("laughs")
            .count("user_id")
            .where({ user_id })
            .andWhereRaw("memes.id = laughs.meme_id")
            .as("isUser");
        const meme = await db
            .select("memes.*", counts, isUser, "users.username")
            .from("memes")
            .leftJoin('users', 'users.id', 'memes.user_id')
            .whereRaw("memes.id = ?", meme_id)
        res.send(meme);
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
    singleMemes,
    addComment,
    viewComment,
}