import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "userSlice",
	initialState: { currentUser: null },
	reducers: {
		addUser: (state, action) => {
			console.log(action);
			state.currentUser = action.payload;
		},
	},
});

const { addUser } = userSlice.actions;

export { addUser };

export default userSlice;
