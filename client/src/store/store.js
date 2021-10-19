import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../slice/authSlice"
import memeReducer from "../slice/memeSlice"

export default configureStore({
    reducer: {
        auth: authReducer,
        memes: memeReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })

})