import Comment from "./components/Comment.jsx";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "./redux/user.js";
import { addComment } from "./redux/comments.js";
import "./App.css";

function App() {
	const { currentUser } = useSelector((state) => state.user);
	const comments = useSelector((state) => state.comments);
	const dispatch = useDispatch();

	useEffect(() => {
		fetch("/data.json")
			.then((res) => res.json())
			.then((data) => {
				data.comments.forEach((comment) => dispatch(addComment(comment)));
				dispatch(addUser(data.currentUser));
			});
	}, []);

	return (
		<>
			<section className="comment-section">
				<div className="comments">
					{comments &&
						comments.map((comment) => (
							<Comment
								key={comment.id}
								{...comment}
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
