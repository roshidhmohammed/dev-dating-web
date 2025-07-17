import { createSlice, } from "@reduxjs/toolkit";
import  type {UserData} from "../../types/types"

const initialState: UserData | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (_state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
