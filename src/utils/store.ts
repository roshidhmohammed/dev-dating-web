import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice"
import connectionReducer from "./slices/connectionsSlice"
import requestReducer from "./slices/requestsSlice"


const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections:connectionReducer,
    requests:requestReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
