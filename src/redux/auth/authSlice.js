import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    name: "",
    email: "",
    photo: "",
    isAuth: false,
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;
