import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addMemeAction = createAsyncThunk("memes/addMemeAction", async(memes) => {
    try {
        const add = await axios.post("/memes", memes, { headers: JSON.parse(localStorage.getItem("memers")) });
        return add.data;
    } catch (error) {
        console.log(error);
    }
});


export const viewAllMemeAction = createAsyncThunk("memes/viewAllMemeAction", async(memes) => {
    try {
        const memes = await axios.get("/memes", { headers: JSON.parse(localStorage.getItem("memers")) });
        return memes.data;
    } catch (error) {
        console.log(error);
        return []
    }
});

export const viewSingleMemeAction = createAsyncThunk("memes/viewSingleMemeAction", async(id) => {
    try {
        const memes = await axios.get(`/memes/${id}`, { headers: JSON.parse(localStorage.getItem("memers")) });
        return memes.data;
    } catch (error) {
        console.log(error);
        return []
    }
});

export const laughAction = createAsyncThunk("memes/laughAction", async(id) => {
    try {
        const meme = await axios.post(`/memes/laugh/${id}`, {}, { headers: JSON.parse(localStorage.getItem("memers")) });
        return meme.data;
    } catch (error) {
        console.log(error);
    }
});

export const deleteMemeAction = createAsyncThunk("memes/deleteMemeAction", async(id) => {
    try {
        const meme = await axios.delete(`/memes/${id}`, { headers: JSON.parse(localStorage.getItem("memers")) });
        return meme.data;
    } catch (error) {
        console.log(error);
    }
});

export const editMemeAction = createAsyncThunk("memes/editMemeAction", async({ id, status }) => {
    try {
        const meme = await axios.patch(`/memes/${id}`, { status }, { headers: JSON.parse(localStorage.getItem("memers")) });
        return meme.data[0];
    } catch (error) {
        console.log(error);
    }
});

export const viewCommentsAction = createAsyncThunk("memes/viewCommentsAction", async(id) => {
    try {
        const comments = await axios.get(`/memes/comment/${id}`, { headers: JSON.parse(localStorage.getItem("memers")) });
        return comments.data;

    } catch (error) {
        console.log(error);
    }
});

export const addCommentsAction = createAsyncThunk("memes/addCommentsAction", async({ id, comment }) => {
    try {
        const commentReq = await axios.post(`/memes/comment/${id}`, { comment }, { headers: JSON.parse(localStorage.getItem("memers")) });
        return commentReq.data;

    } catch (error) {
        console.log(error);
    }
})