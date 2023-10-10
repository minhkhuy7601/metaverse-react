import map from "@/redux/slices/mapSlice";
import popupQASlice from "@/redux/slices/popupQASlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
	reducer: {
		map,
		popupQASlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
