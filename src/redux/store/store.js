import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import { persistedAuthReducer } from "../slices/authSlice";
import fileReducer from "../slices/fileSlice"

// import userReducer from "./userSlice"; // Example user reducer
// import settingsReducer from "./settingsSlice"; // Example settings reducer

// Persist Configuration
const persistConfig = {
    key: "root", // Use a common key
    storage,
    whitelist: ["auth"], // Persist only specific reducers
    serialize: false
};

// Combine Multiple Reducers
const rootReducer = combineReducers({
    auth: persistedAuthReducer,
    files: fileReducer
});

// Wrap the Root Reducer with Persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Required for redux-persist
        }),
});

export const persistor = persistStore(store);
export default store;
