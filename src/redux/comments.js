import { createSlice } from "@reduxjs/toolkit";
import reducers from "./commentsReducers.js";

const commentsSlice = createSlice({
	name: "commentsSlice",
	initialState: {
		totalComments: 0,
		comments: [],
	},
	reducers,
});

const { addComment, removeComment, updateComment } = commentsSlice.actions;

export { addComment, removeComment, updateComment };

export default commentsSlice;
