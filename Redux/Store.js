import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./UserSlice"; // Updated import name

export const store = configureStore({
  reducer: {
    userdata: userSliceReducer, // Updated variable name
  },
});
