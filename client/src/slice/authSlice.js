import { createSlice } from "@reduxjs/toolkit"
import { signupAction, verifyAuth } from "./actions/authAction";




const initialState = {
    pending: false,
    auth: null,
    errors: [],
    token: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addAuthErrors: (state, action) => {
            state.errors.push(action.payload);
        },
        resetAuthErrors: (state, action) => {
            state.errors = []
        }

    },
    extraReducers: {
        [verifyAuth.fulfilled]: (state, action) => {
            state.auth = action.payload;
        },
        [signupAction.pending]: (state) => {
            state.pending = true
        },
        [signupAction.fulfilled]: (state, action) => {
            if ("error" in action.payload) {
                console.log(action.payload);
                state.errors.push(action.payload.error);
            } else {
                state.auth = true;
                state.token = action.payload.token;
            }
            state.pending = false
        }

    }
})

const authReducer = authSlice.reducer
export const { addAuthErrors, resetAuthErrors } = authSlice.actions;
export default authReducer;