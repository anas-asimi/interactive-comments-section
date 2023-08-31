// add new comment
function addComment(state, action) {
	let { id, content, createdAt, score, user, parentPath, path } =
	action.payload;
	// validate inputs props
	if (!(path || typeof parentPath == 'string')) {
		throw new Error("no path or parentPath property in addComment action");
	}
	if (!content) {
		throw new Error("no content in addComment action");
	}
	id = id ?? state.totalComments + 1;
	path = path ?? parentPath + id;
	score = score ?? 0;
	createdAt = createdAt ?? "now";
	let replies = [];
	// add comment to the state
	if (path.length == 1) {
		state.comments.push({
			id,
			path,
			score,
			createdAt,
			content,
			replies,
			user,
		});
	} else {
		let parentPath = path.slice(0, -1);
		let targetedComment = findByPath(state.comments, parentPath);
		targetedComment.replies.push({
			id,
			path,
			score,
			createdAt,
			content,
			replies,
			user,
		});
	}
	state.totalComments++;
}
//
//
// update old comment
function updateComment(state, action) {
	let content = action.payload.content;
	let target = findByPath(state.comments, action.payload.path);
	target.content = content;
}
//
//
// remove old comment
function removeComment(state, action) {
	let nodeid = action.payload.path.slice(-1);
	if (action.payload.path.length == 1) {
		state.comments = state.comments.filter((ele) => ele.id != nodeid);
	} else {
		let parentPath = action.payload.path.slice(0, -1);
		let parentNode = findByPath(state.comments, parentPath);
		parentNode.replies = parentNode.replies.filter(
			(ele) => ele.id != nodeid
		);
	}
	state.totalComments--;
}

export default {
	addComment,
	removeComment,
	updateComment,
};

//
//
// find comment reference by path
export function findByPath(tree, path) {
	if (path == "") return tree;
	let nodeId = path.slice(0, 1);
	path = path.slice(1);
	let node = tree.find((ele) => ele.id == nodeId);
	if (path == "") return node;
	return findByPath(node.replies, path);
}
