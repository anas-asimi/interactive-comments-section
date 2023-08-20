/* eslint-disable react/prop-types */
function Comment({
	score,
	content,
	user,
	createdAt,
	currentUserName,
	replies,
}) {
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
							{currentUserName == user.username && (
								<span className="you">you</span>
							)}
						</p>
						<p className="createdAt">{createdAt}</p>
						<button className="button-secondary">
							<img
								src="/icon-reply.svg"
								alt="reply"
								height="12px"
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
							<Comment
								key={reply.id}
								{...reply}
								currentUserName={user.username}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default Comment;
