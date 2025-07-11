import { createSlice } from "@reduxjs/toolkit";

const fileSlice = createSlice({
    name: "files",
    initialState: {
        image: [],
        files: []
    },
    reducers: {
        storeImage: (state, action) => {
            state.image = action.payload;
        },
        storeFiles: (state, action) => {
            state.files = action.payload;
        },

        clearImages: (state) => {
            state.image = [];
        }

    },
});

export const { storeImage, clearImages, storeFiles } = fileSlice.actions;
export default fileSlice.reducer;
