import store from "./redux/store.js";
import { addUser } from "./redux/user.js";
import { addComment } from "./redux/comments.js";

export default function initializedata() {
	fetch("/data.json")
		.then((res) => res.json())
		.then((data) => {
			store.dispatch(addUser(data.currentUser));
			data.comments.forEach((comment) => addCommentRecursively(comment));
		});
}

function addCommentRecursively(comment) {
	if (!comment?.path) {
		comment.path = `${comment.id}`
	}
	store.dispatch(addComment({ ...comment, replies: [] }));
	if (comment.replies && comment.replies.length > 0) {
		comment.replies.forEach((reply) => {
			let path = `${comment.path}${reply.id}`;
			addCommentRecursively({ ...reply, path });
		});
	}
}
