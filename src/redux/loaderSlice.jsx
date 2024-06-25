import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    ShowLoading: (state) => {
      state.loading = true;
    },
    HideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { ShowLoading, HideLoading } = loaderSlice.actions;

export default loaderSlice.reducer;
