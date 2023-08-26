import { describe, expect, test } from "vitest";
import store from "./store.js";
import { addComment, removeComment, updateComment } from "./comments.js";

let comment = {
	id: 4,
	content:
		"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
	createdAt: "2 days ago",
	score: 2,
	replyingTo: "ramsesmiron",
	user: {
		image: {
			png: "/avatars/image-juliusomo.png",
			webp: "/avatars/image-juliusomo.webp",
		},
		username: "juliusomo",
	},
	path: "4",
};
let comment_update = {
	content: "new content",
	path: "4",
};

describe("add new comments", () => {
	let { commentsSlice } = store.getState();
	expect(commentsSlice.comments.length).toBe(0);
	expect(commentsSlice.totalComments).toBe(0);

	store.dispatch(addComment(comment));
	commentsSlice = store.getState().commentsSlice;

	test("comment is added", () => {
		expect(commentsSlice.comments[0]).toBe(comment);
	});
	test("totalComments is incremented", () => {
		expect(commentsSlice.totalComments).toBe(1);
	});
});

describe("update old comment", () => {
	let { commentsSlice } = store.getState();
	expect(commentsSlice.comments[0]).toBe(comment);
	expect(commentsSlice.totalComments).toBe(1);

	store.dispatch(updateComment(comment_update));
	commentsSlice = store.getState().commentsSlice;
	test("comment is updated", () => {
		expect(commentsSlice.comments[0].content).toBe(comment_update.content);
	});
});

describe("delete old comment", () => {
	let { commentsSlice } = store.getState();
	expect(commentsSlice.comments.length).toBe(1);
	expect(commentsSlice.totalComments).toBe(1);

	store.dispatch(removeComment({ path: "4" }));
	commentsSlice = store.getState().commentsSlice;

	test("comment is removed", () => {
		expect(commentsSlice.comments.length).toBe(0);
	});
	test("totalComments is decremented", () => {
		expect(commentsSlice.totalComments).toBe(0);
	});
});
