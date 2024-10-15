import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { token, URL } from "../../lib/utils";

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (value) => {
    try {
      const { data } = await axios.post(`${URL}/user/register`, value);
      if (data.success == 1) {
        window.location.pathname = "/login";
        return data;
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const loginUser = createAsyncThunk("auth/loginUser", async (value) => {
  try {
    const { data } = await axios.post(`${URL}/user/login`, value);
    if (data.success == 1) {
      localStorage.setItem("token", JSON.stringify(data.details.token));
      window.location.pathname = "/";
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
});
export const userProfile = createAsyncThunk("auth/userProfile", async () => {
  try {
    const config = token();

    const { data } = await axios.get(`${URL}/user/profile`, config);

    if (data.success == 1) {
      // window.location.pathname = "/";
      return data;
    }
  } catch (error) {
    console.log(error.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state, action) => {
      localStorage.removeItem("token");
      state.user = null;
      window.location.pathname = "/login";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      //   state.user = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      //   state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(userProfile.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
