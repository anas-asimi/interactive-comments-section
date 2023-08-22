import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
	name: "comments",
	initialState: [],
	reducers: {
		addComment: (state, action) => {
			state.push(action.payload);
		},
		removeComment: (state, action) => {
			state = state.filter((comment) => comment.id != action.payload.id);
		},
		updateComment: (state, action) => {
			state.forEach((comment) => {
				if (comment.id == action.payload.id) {
					comment = { ...comment, ...action.payload };
				}
			});
		},
	},
});


const { addComment, removeComment, updateComment } = commentsSlice.actions;

export { addComment, removeComment, updateComment };

export default commentsSlice