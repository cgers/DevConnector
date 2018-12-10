import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		const { post, loading } = this.props.post;
		let postContent;

		if (post === null || loading || Object.keys(post).length === 0) {
			postContent = <Spinner />;
		} else {
			postContent = (
				<div>
					{/* <h1>PostId {post._id}</h1> */}
					<PostItem post={post} showActions={false} />
					<CommentForm postId={post._id} />
					<CommentFeed postId={post._id} comments={post.comment} />
				</div>
			);
		}

		return (
			<div className='post'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<Link to='/feed' className='btn btn-light mb-3'>
								Back To Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import Spinner from '../common/spinner';
// import { getPost } from '../../actions/postActions';
// import PostItem from '../posts/PostItem';
// import { Link } from 'react-router-dom';
// import CommentForm from './CommentForm';
// //import CommentFeed from './CommentFeed';
// class Post extends Component {
// 	componentDidMount() {
// 		this.props.getPost(this.props.match.params.id);
// 	}

// 	render() {
// 		const { post, loading } = this.props.post;

// 		let PostID;
// 		PostID = post._id;

// 		let postContent;
// 		if (loading) {
// 			postContent = <Spinner />;
// 		} else {
// 			postContent = (
// 				<div>
// 					<h1>27 postId={PostID}</h1>
// 					<PostItem post={post} showActions={false} />
// 					<CommentForm postId={PostID} />
// 					<h1>Number of comments: {this.props.comment.length}</h1>
// 					{/* <CommentFeed postId={PostID} comment={this.props.post.post.comment} /> */}
// 				</div>
// 			);
// 		}

// 		return (
// 			<div className='post'>
// 				<h1>PostId: {PostID}</h1>
// 				<div className='container'>
// 					<div className='row'>
// 						<div className='col-md-12'>
// 							<Link to='/feed' className='btn btn-light mb-3'>
// 								Back to feed
// 							</Link>
// 							{postContent}
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// Post.propTypes = {
// 	post: PropTypes.object.isRequired,
// 	getPost: PropTypes.func.isRequired
// };

// const mapStateToProps = (state) => ({
// 	post: state.post
// });
// export default connect(mapStateToProps, { getPost })(Post);
