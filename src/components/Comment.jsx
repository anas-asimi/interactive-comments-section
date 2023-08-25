/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { removeComment } from "../redux/comments.js";
import { useDispatch } from "react-redux";

function Comment({ score, content, user, createdAt, replies, path }) {
	const { currentUser } = useSelector((state) => state.userSlice);
	const dispatch = useDispatch();
	return (
		<div className="comment-container">
			<div className="comment">
				<p className="comment-score">{score}</p>
				<div className="comment-main">
					<div className="comment-head">
						<div className="avatar">
							<img
								src={user.image.png}
								height="32"
								width="32"
								alt={user.username}
							/>
						</div>
						<p className="username">
							{user.username}
							{currentUser.username == user.username && (
								<span className="you">you</span>
							)}
						</p>
						<p className="createdAt">{createdAt}</p>
						{currentUser.username == user.username && (
							<>
								<button
									className="button-secondary delete"
									onClick={() => {
										dispatch(removeComment({path}));
									}}
								>
									<img
										src="/icon-delete.svg"
										alt="delete"
										size="12px"
										width="12px"
									/>
									delete
								</button>
								<button className="button-secondary">
									<img
										src="/icon-edit.svg"
										alt="edit"
										size="12px"
										width="12px"
									/>
									edit
								</button>
							</>
						)}
						<button className="button-secondary">
							<img
								src="/icon-reply.svg"
								alt="reply"
								size="12px"
								width="12px"
							/>
							reply
						</button>
					</div>
					<p className="content">{content}</p>
				</div>
			</div>
			{replies?.length > 0 && (
				<div className="replies-container">
					<div className="line"></div>
					<div className="replies">
						{replies.map((reply) => (
							<Comment key={reply.id} {...reply} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Comment;
