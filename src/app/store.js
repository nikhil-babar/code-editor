import { combineReducers, configureStore } from "@reduxjs/toolkit";
import editorReducer from "../features/Editor/editorSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";

const reducers = combineReducers({ editor: editorReducer, auth: authReducer });
const persistedReducer = persistReducer(
  { key: "CODE_EDITOR", storage, version: 1, blacklist: ["auth"] },
  reducers
);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
