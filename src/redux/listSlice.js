import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  lists: [],
  list: {},
};

export const getLists = createAsyncThunk("list/getLists", async (id) => {
  const { data } = await axios.get(`/api/lists?boardId=${id}`);
  return data;
});

export const getList = createAsyncThunk("list/getList", async (listData) => {
  const { data } = await axios.get(
    `/api/lists/${listData.listId}?boardId=${listData.boardId}`
  );
  return data;
});

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: {
    [getLists.pending]: (state, action) => {
      state.status = "loading";
    },
    [getLists.fulfilled]: (state, action) => {
      state.lists = action.payload.response.lists;
      state.status = "success";
    },
    [getLists.rejected]: (state, action) => {
      state.status = "failed";
    },

    [getList.pending]: (state, action) => {
      state.status = "loading";
    },
    [getList.fulfilled]: (state, action) => {
      state.list = action.payload.response.list;
      state.status = "success";
    },
    [getList.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default listSlice.reducer;
// export const { } = listSlice.actions;
