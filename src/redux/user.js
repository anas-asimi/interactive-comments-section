import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: { currentUser: null },
	reducers: {
		addUser: (state, action) => {
			state.currentUser = action.payload;
		},
	},
});

const { addUser } = userSlice.actions;

export { addUser };

export default userSlice;
