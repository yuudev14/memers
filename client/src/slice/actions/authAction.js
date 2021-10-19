import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyAuth = createAsyncThunk("auth/verifyAuth", async() => {
    try {
        const token = localStorage.getItem("memers");
        if (token) {
            const verify = await axios.get("/auth", { headers: JSON.parse(token) });
            console.log(verify);
            return verify.data;
        }
        return false;

    } catch (error) {
        console.log(error.request.response);
        return false;
    }
});

export const signupAction = createAsyncThunk("auth/signupAction", async(signupForm) => {
    try {
        const signup = await axios.post("/auth/sign-up", signupForm);
        const data = signup.data;
        localStorage.setItem("memers", JSON.stringify({ token: data.token }))
        return data;
    } catch (error) {
        return { error: error.request.response }
    }
});


export const loginAction = createAsyncThunk("auth/loginAction", async(signupForm) => {
    try {
        const login = await axios.post("/auth/sign-in", signupForm);
        const data = login.data;
        localStorage.setItem("memers", JSON.stringify({ token: data.token }))
        return data;
    } catch (error) {
        return { error: error.request.response }
    }
});