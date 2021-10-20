import { createSlice } from "@reduxjs/toolkit"
import { loginAction, signupAction, verifyAuth } from "./actions/authAction";




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
        },
        logoutAuth: () => {
            localStorage.removeItem("memers");
            return {
                ...initialState,
                auth: false
            };
        }

    },
    extraReducers: {
        [verifyAuth.fulfilled]: (state, action) => {
            if (action.payload) {
                return {
                    ...state,
                    auth: true,
                    ...JSON.parse(localStorage.getItem("memers")),
                    userInfo: action.payload[0],
                }
            }
            state.auth = false;
        },
        [signupAction.pending]: (state) => {
            state.pending = true
        },
        [signupAction.fulfilled]: (state, action) => {
            if ("error" in action.payload) {
                state.errors.push(action.payload.error);
            } else {
                state.auth = true;
                state.token = action.payload.token;
                state.userInfo = action.payload.userInfo;
            }
            state.pending = false
        },
        [loginAction.pending]: (state) => {
            state.pending = true
        },
        [loginAction.fulfilled]: (state, action) => {
            if ("error" in action.payload) {
                state.errors.push(action.payload.error);
            } else {
                state.auth = true;
                state.token = action.payload.token;
                state.userInfo = action.payload.userInfo;
            }
            state.pending = false
        }

    }
})

const authReducer = authSlice.reducer
export const { addAuthErrors, resetAuthErrors, logoutAuth } = authSlice.actions;
export default authReducer;