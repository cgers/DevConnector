import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
	render() {
		const { comments, postId } = this.props;

		return comments.map((com) => <CommentItem key={com._id} comment={com} postId={postId} />);
	}
}

CommentFeed.propTypes = {
	comments: PropTypes.array.isRequired,
	postId: PropTypes.string.isRequired
};

export default CommentFeed;
