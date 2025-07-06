import { createSlice } from "@reduxjs/toolkit";
import type { UserData } from "../../types";

const initialState :UserData[] | null = null;;

const connectionsSlice = createSlice({
  name: "connectons",
  initialState,
  reducers: {
    addConnections: (_state, action) => action.payload,
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
