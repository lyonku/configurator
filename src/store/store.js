import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userSlice from "../features/user/userSlice";
import librarySlice from "../features/library/librarySlice";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    library: librarySlice,
  },
  composeWithDevTools,
});
