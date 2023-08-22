import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import commentsSlice from "./comments";

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		comments: commentsSlice.reducer,
	},
});

export default store;