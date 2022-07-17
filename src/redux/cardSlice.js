import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  cards: [],
};

export const getCards = createAsyncThunk("card/getCards", async (cardData) => {
  const { data } = await axios.get(
    `/api/cards?boardId=${cardData.boardId}&listId=${cardData.listId}`
  );
  return data;
});

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
  extraReducers: {
    [getCards.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCards.fulfilled]: (state, action) => {
      state.cards = action.payload.response.cards;
      state.status = "success";
    },
    [getCards.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default cardSlice.reducer;
// export const { } = cardSlice.actions;
