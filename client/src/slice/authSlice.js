import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    auth: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: {

    }
})

const authReducer = authSlice.reducer
    // export const { } = authSlice.actions;
export default authReducer;