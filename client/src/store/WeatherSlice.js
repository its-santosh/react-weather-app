import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchLocation: "",
  isSearchButtonClicked: false,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.searchLocation = action.payload;
    },
    setSearchButtonClicked(state, action) {
      state.isSearchButtonClicked = action.payload;
    },
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
