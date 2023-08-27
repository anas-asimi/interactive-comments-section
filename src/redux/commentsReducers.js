/* eslint-disable no-unused-vars */
// add new comment
function addComment(state, action) {
	// if new comment
	if (!action.payload.id) {
		action.payload.id = state.totalComments + 1;
		action.payload.path = action.payload.parentPath + action.payload.id;
		action.payload.score = 0;
		action.payload.createdAt = "now";
		action.payload.replies = [];
		delete action.payload.parentPath;
	}
	console.log(action);
	if (action.payload.path.length == 1) {
		state.comments.push(action.payload);
	} else {
		let parentPath = action.payload.path.slice(0, -1);
		let targetedComment = findByPath(state.comments, parentPath);
		targetedComment.replies.push(action.payload);
	}
	state.totalComments++;
}
//
//
// update old comment
function updateComment(state, action) {
	console.log(action);
	let content = action.payload.content;
	let target = findByPath(state.comments, action.payload.path);
	target.content = content;
}
//
//
// remove old comment
function removeComment(state, action) {
	console.log(action);
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
