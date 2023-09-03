/* eslint-disable react-hooks/exhaustive-deps */
import Comment from "./components/Comment.jsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import initializedata from "./utils.js";
import { addComment } from "./redux/comments.js";
import "./App.css";

function App() {
	const { currentUser } = useSelector((state) => state.userSlice);
	const { comments } = useSelector((state) => state.commentsSlice);
	const dispatch = useDispatch();
	// state represent your comment target (normal comment or reply to someone)
	const [replyingTo, setReplyingTo] = useState();
	const commentField = useRef();
	useEffect(initializedata, []);
	function submit(e) {
		e.preventDefault();
		if (commentField.current.value) {
			dispatch(
				addComment({
					content: commentField.current.value,
					parentPath: replyingTo?.path ?? "",
					user: { ...currentUser },
				})
			);
			commentField.current.value = "";
			setReplyingTo();
		} else {
			console.log("empty comment !!");
		}
	}
	function hanldeReplyingTo(path,username) {
		setReplyingTo({
			path,
			username,
		});
		commentField.current.focus();
	}
	return (
		<>
			<section className="comment-section">
				<div className="comments">
					{comments &&
						comments.map((comment) => (
							<Comment
								replyingTo={replyingTo}
								key={comment.id}
								{...comment}
								setReplyingTo={hanldeReplyingTo}
							/>
						))}
				</div>
				{currentUser && (
					<form>
						<div className="avatar">
							<img
								src={currentUser.image.png}
								height="48"
								width="48"
								alt={currentUser.username}
							/>
						</div>
						<textarea
							name="add-comment"
							id="add-comment"
							label="add-comment"
							title="add-comment"
							rows="4"
							ref={commentField}
							placeholder={
								replyingTo?.username
									? `replying to ${replyingTo.username}`
									: ""
							}
						></textarea>
						<div className="button-group">
							<button
								type="submit"
								className="button-primary"
								onClick={submit}
							>
								send
							</button>
							<button
								className="button-primary"
								onClick={(e) => {
									e.preventDefault();
									setReplyingTo();
								}}
								disabled={!replyingTo}
							>
								reset
							</button>
						</div>
					</form>
				)}
			</section>
		</>
	);
}

export default App;
