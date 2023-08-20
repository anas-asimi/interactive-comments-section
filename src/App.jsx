import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Comment from "./components/Comment.jsx";

function App() {
	let [comments, setComments] = useState(null);
	let [user, setUser] = useState(null);
	useEffect(() => {
		fetch("/data.json")
			.then((res) => res.json())
			.then((data) => {
				setComments(data.comments);
				setUser(data.currentUser);
			});
	}, []);
	console.log(comments && comments[0]);
	return (
		<>
			<section className="comment-section">
				<div className="comments">
					{comments &&
						comments.map((comment) => (
							<Comment
								key={comment.id}
								{...comment}
								currentUserName={user.username}
							/>
						))}
				</div>
				<form>
					<div className="avatar">
						<img
							src={user?.image.png}
							height="48"
							width="48"
							alt={user?.username}
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
			</section>
		</>
	);
}

export default App;
