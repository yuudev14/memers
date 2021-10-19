import { createSlice } from "@reduxjs/toolkit";
import { addMemeAction, deleteMemeAction, editMemeAction, laughAction, viewAllMemeAction, viewSingleMemeAction } from "./actions/memeAction";

const initialState = {
    memes: [],
    pending: false
}

const memeSlice = createSlice({
    name: "memes",
    initialState,
    reducers: {
        resetMemeAction: (state) => {
            state.meme = [];
        }
    },
    extraReducers: {
        [addMemeAction.pending]: (state) => {
            state.pending = true
        },
        [addMemeAction.fulfilled]: (state, action) => {
            state.memes = [...action.payload, ...state.memes];
            state.pending = false;
        },
        [viewAllMemeAction.pending]: (state) => {
            state.pending = true
        },
        [viewAllMemeAction.fulfilled]: (state, action) => {
            state.memes = action.payload;
            state.pending = false;
        },
        [viewSingleMemeAction.pending]: (state) => {
            state.pending = true
        },
        [viewSingleMemeAction.fulfilled]: (state, action) => {
            state.memes = action.payload;
            state.pending = false;
        },
        [laughAction.pending]: (state) => {
            state.pending = true
        },
        [laughAction.fulfilled]: (state, action) => {
            console.log(action.payload);
            state.memes = state.memes.map(meme => {
                if (meme.id === action.payload.meme_id) {
                    return {
                        ...meme,
                        ...action.payload,
                        laugh: (Number(meme.laugh) + (action.payload.isUser === "0" ? -1 : 1)).toString()
                    }
                }
                return meme
            })
            state.pending = false;
        },
        [deleteMemeAction.pending]: (state, action) => {
            state.pending = true;
        },
        [deleteMemeAction.fulfilled]: (state, action) => {
            state.memes = state.memes.filter(meme => meme.id !== action.payload.id);
            state.pending = false;
        },
        [editMemeAction.pending]: (state, action) => {
            state.pending = true;
        },
        [editMemeAction.fulfilled]: (state, action) => {
            state.memes = state.memes.map(meme => {
                if (meme.id === action.payload.id) {
                    return {
                        ...meme,
                        ...action.payload,
                    }
                }
                return meme
            });
            state.pending = false;
        }
    }
});

const memeReducer = memeSlice.reducer;
export const { resetMemeAction } = memeSlice.actions
export default memeReducer;