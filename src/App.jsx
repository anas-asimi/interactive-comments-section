/* eslint-disable react-hooks/exhaustive-deps */
import Comment from "./components/Comment.jsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import initializedata from "./utils.js";
import "./App.css";

function App() {
	const { currentUser } = useSelector((state) => state.userSlice);
	const { comments } = useSelector((state) => state.commentsSlice);
	// console.log(comments);
	useEffect(initializedata, []);

	return (
		<>
			<section className="comment-section">
				<div className="comments">
					{comments &&
						comments.map((comment) => (
							<Comment key={comment.id} {...comment} />
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
						></textarea>
						<button type="submit" className="button-primary">
							send
						</button>
					</form>
				)}
			</section>
		</>
	);
}

export default App;
