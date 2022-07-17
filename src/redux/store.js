import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import boardSlice from "./boardSlice";
import cardSlice from "./cardSlice";
import listSlice from "./listSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    board: boardSlice,
    list: listSlice,
    card: cardSlice,
  },
});
