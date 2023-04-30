import { configureStore } from "@reduxjs/toolkit";
import editorReducer from "../features/Editor/editorSlice";


const store = configureStore({
    reducer: {
        editor: editorReducer
    }
})

export default store