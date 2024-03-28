import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listing: [],
  loading: false,
  error: false,
};

const counterSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    appendListing: (state, action) => {
      state.listing = [action.payload.feedItem, ...state.listing];
    },
    setFeedListing: (state, action) => {
      const { listing, loading, error } = action.payload;
      state.listing = listing;
      state.loading = loading;
      state.error = error;
    },
  },
});

export const { appendListing, setFeedListing } = counterSlice.actions;

export default counterSlice.reducer;
