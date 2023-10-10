import { createSlice } from "@reduxjs/toolkit";

export interface VideoState {
  isShow: boolean;
}

const initialState: VideoState = {
  isShow: false,
};

export const videoSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setShowVideo: (state, { payload }) => {
      state.isShow = payload;
    },
  },
});

export const { setShowVideo } = videoSlice.actions;

export default videoSlice.reducer;
