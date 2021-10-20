import { createSlice } from "@reduxjs/toolkit";
import { addCommentsAction, addMemeAction, deleteMemeAction, editMemeAction, laughAction, viewAllMemeAction, viewCommentsAction, viewSingleMemeAction } from "./actions/memeAction";

const initialState = {
    memes: [],
    pending: false,
    error: ""
}

const memeSlice = createSlice({
    name: "memes",
    initialState,
    reducers: {
        resetMemeAction: (state) => {
            state.meme = [];
        },
        restartMemeError: (state) => {
            state.error = ""
        }
    },
    extraReducers: {
        [addMemeAction.pending]: (state) => {
            state.pending = true
        },
        [addMemeAction.fulfilled]: (state, action) => {
            if ("error" in action.payload) {
                state.error = action.payload.error
            } else {
                state.memes = [...action.payload, ...state.memes];

            }
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
        },
        [viewCommentsAction.pending]: (state) => {
            state.pending = true;
        },

        [viewCommentsAction.fulfilled]: (state, action) => {
            if (action.payload.length) {
                state.memes = state.memes.map(meme => {
                    if (meme.id === action.payload[0].meme_id) {
                        return {
                            ...meme,
                            comments: action.payload
                        }
                    }
                    return meme
                });
            }
            state.pending = false;
        },
        [addCommentsAction.pending]: (state) => {
            state.pending = true;
        },
        [addCommentsAction.fulfilled]: (state, action) => {
            state.memes = state.memes.map(meme => {
                if (meme.id === action.payload.meme_id) {
                    return {
                        ...meme,
                        comments: meme.comments ? [action.payload, ...meme.comments] : [action.payload]
                    }
                }
                return meme
            });
            state.pending = false;
        },
    }
});

const memeReducer = memeSlice.reducer;
export const { resetMemeAction, restartMemeError } = memeSlice.actions
export default memeReducer;