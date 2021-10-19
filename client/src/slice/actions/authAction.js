import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyAuth = createAsyncThunk("auth/verifyAuth", async() => {
    try {
        const token = localStorage.getItem("memers");
        console.log(token);
        if (token) {
            const verify = await axios.get("/auth", { headers: JSON.parse(token) });
            console.log(verify);
            return verify || false;
        }
        return false;

    } catch (error) {
        console.log(error.request.response);
        return false;
    }
})

export const signupAction = createAsyncThunk("auth/signupAction", async(signupForm) => {
    try {
        const signup = await axios.post("/auth/sign-up", signupForm);
        console.log(signup);
        const data = signup.data;
        localStorage.setItem("memers", JSON.stringify(data))
        return data;
    } catch (error) {
        return { error: error.request.response }
    }
})