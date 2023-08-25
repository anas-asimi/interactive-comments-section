import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.js";
import commentsSlice from "./comments.js";

const store = configureStore({
	reducer: {
		userSlice: userSlice.reducer,
		commentsSlice: commentsSlice.reducer,
	},
});

export default store;