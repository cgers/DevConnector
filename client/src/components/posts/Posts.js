import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import spinner from '../common/spinner';
import PropTypes from 'prop-types';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {
	componentDidMount() {
		this.props.getPosts();
	}
	render() {
		const { posts, loading } = this.props.post;
		let postContent;
		if (posts === null || loading) {
			postContent = <spinner />;
		}
		postContent = <PostFeed posts={posts} />;
		return (
			<div className='feed'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<PostForm />
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
};

const mapStatetoProps = (state) => ({
	post: state.post
});

export default connect(mapStatetoProps, { getPosts })(Posts);
