import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null, // Store token here
        user: {},
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        updateUser: (state, action) => {
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = {};
        },
    },
});

export const { loginSuccess, logout, updateUser } = authSlice.actions;

const persistConfig = { key: "auth", storage };
export const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);
