import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addUsers: (_state, action) => action.payload,
  },
});

export const { addUsers } = feedSlice.actions;
export default feedSlice.reducer;
