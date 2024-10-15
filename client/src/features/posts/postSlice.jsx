import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { token, URL } from "../../lib/utils";

const initialState = {
  posts: [],
  isLoading: false,
  isError: false,
};

export const getAllPosts = createAsyncThunk("posts/getAllPosts", async () => {
  try {
    const config = token();
    const { data } = await axios.get(`${URL}/post`, config);
    if (data.success == 1) {
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload.details;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = postSlice.actions;

export default postSlice.reducer;
