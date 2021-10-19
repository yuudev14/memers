import { createSlice } from "@reduxjs/toolkit";
import { addMemeAction } from "./actions/memeAction";

const initialState = {
    memes: [],
    pending: false
}

const memeSlice = createSlice({
    name: "memes",
    initialState,
    reducers: {},
    extraReducers: {
        [addMemeAction.pending]: (state) => {
            state.pending = true
        },
        [addMemeAction.fulfilled]: (state, action) => {
            state.memes.unshift(action.payload);
            state.pending = false;
        },
    }
});

const memeReducer = memeSlice.reducer;
// export {  }
export default memeReducer;