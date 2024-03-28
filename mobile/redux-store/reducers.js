import { combineReducers } from "@reduxjs/toolkit";
import feedReducer from "./feed-slice";

const rootReducer = combineReducers({
  feed: feedReducer,
});

export default rootReducer;
