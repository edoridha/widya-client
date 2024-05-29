import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./reducers/bookSlice";
import userSlice from "./reducers/userSlice"

export const store = configureStore({
    reducer: {
       bookList: bookSlice,
       userList: userSlice
    }
})