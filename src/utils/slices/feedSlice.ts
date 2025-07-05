import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addUsers: (_state, action) => action.payload,
    removeUserFromFeed: (state, action) => {
      const newFeed = state?.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addUsers, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
