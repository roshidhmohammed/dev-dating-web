import { createSlice } from "@reduxjs/toolkit";
import type { UserData } from "../../types";

const initialState: UserData[]  =[]
const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    addUsers: (_state, action) => action.payload,
    removeUserFromFeed: (state, action) => {
      const newFeed =  state?.filter((user:UserData) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addUsers, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
