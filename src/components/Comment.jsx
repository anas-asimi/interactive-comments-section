/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { removeComment, updateComment } from "../redux/comments.js";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

function Comment({
	score,
	content,
	user,
	createdAt,
	replies,
	path,
	replyingTo,
	setReplyingTo,
}) {
	const text_area = useRef();
	const [isEditing, setIsEditing] = useState(false);
	const { currentUser } = useSelector((state) => state.userSlice);
	const dispatch = useDispatch();
	useEffect(() => {
		if (isEditing) {
			text_area.current.focus();
			let value = text_area.current.value;
			text_area.current.value = "";
			text_area.current.value = value;
		}
	});
	return (
		<div className="comment-container">
			<div
				className={`comment ${
					replyingTo?.path == path ? "active" : ""
				}`}
			>
				<p className="comment-score">
					<img src="/icon-plus.svg" alt="vote up" width={12} />
					<span>{score}</span>
					<img src="/icon-minus.svg" alt="vote down" width={12} />
				</p>
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
						{isEditing ? (
							<>
								<button
									className="button-secondary"
									onClick={() => {
										setIsEditing(false);
										dispatch(
											updateComment({
												path,
												content:
													text_area.current.value,
											})
										);
									}}
								>
									save
								</button>
								<button
									className="button-secondary"
									onClick={() => {
										setIsEditing(false);
										text_area.current.value = content;
									}}
								>
									ignore
								</button>
							</>
						) : (
							<>
								{" "}
								{currentUser.username == user.username && (
									<>
										<button
											className="button-secondary delete"
											onClick={() => {
												dispatch(
													removeComment({ path })
												);
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
										<button
											className="button-secondary"
											onClick={() => {
												setIsEditing(true);
											}}
										>
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
								<button
									className="button-secondary"
									onClick={() => {
										setReplyingTo(path, user.username);
									}}
								>
									<img
										src="/icon-reply.svg"
										alt="reply"
										size="12px"
										width="12px"
									/>
									reply
								</button>
							</>
						)}
					</div>
					{isEditing || <p className="content">{content}</p>}
					{currentUser.username == user.username && isEditing && (
						<textarea
							ref={text_area}
							rows={3}
							className="content-field"
							name="content-field"
							defaultValue={content}
						></textarea>
					)}
				</div>
			</div>
			{replies?.length > 0 && (
				<div className="replies-container">
					<div className="line"></div>
					<div className="replies">
						{replies.map((reply) => (
							<Comment
								replyingTo={replyingTo}
								key={reply.id}
								{...reply}
								setReplyingTo={setReplyingTo}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Comment;
