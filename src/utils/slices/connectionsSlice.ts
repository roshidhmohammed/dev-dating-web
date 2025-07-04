import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connectons",
  initialState: null,
  reducers: {
    addConnections: (_state, action) => action.payload,
    removeConnections: () => null,
  },
});

export const { addConnections, removeConnections } = connectionsSlice.actions;

export default connectionsSlice.reducer;
