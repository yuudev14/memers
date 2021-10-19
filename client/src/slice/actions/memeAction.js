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
    }
})