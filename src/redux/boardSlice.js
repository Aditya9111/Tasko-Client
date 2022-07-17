import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  boards: [],
  boardDetails: {},
};

export const getBoards = createAsyncThunk("board/getBoards", async () => {
  const { data } = await axios.get("/api/boards");
  return data;
});
export const getBoardDetails = createAsyncThunk(
  "board/getBoardDetails",
  async (id) => {
    const { data } = await axios.get(`/api/boards/${id}`);
    return data;
  }
);

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    resetBoardDetails: (state, action) => {
      state.boardDetails = {};
    },
  },
  extraReducers: {
    [getBoards.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBoards.fulfilled]: (state, action) => {
      state.boards = action.payload.response.boards;
      state.status = "success";
    },
    [getBoards.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getBoardDetails.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBoardDetails.fulfilled]: (state, action) => {
      state.boardDetails = action.payload.response.board;
      state.status = "success";
    },
    [getBoardDetails.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default boardSlice.reducer;
export const { resetBoardDetails } = boardSlice.actions;
