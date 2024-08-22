import { configureStore} from "@reduxjs/toolkit";
import {activeUserSlice} from "@/app/activeUserSlice";
import userReducer from "@/app/activeUserSlice";

const store = configureStore({
    reducer: {
        activeUser: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;