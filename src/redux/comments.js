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

const { addComment, removeComment, updateComment, voteComment } =
	commentsSlice.actions;

export { addComment, removeComment, updateComment, voteComment };

export default commentsSlice;
