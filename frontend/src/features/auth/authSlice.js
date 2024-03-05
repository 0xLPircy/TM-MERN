import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// thunk helps with async

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // NOT ASYNC
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  // ASYNC THUNK FUNCTIONS
  extraReducers: () => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
