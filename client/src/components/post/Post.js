import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../common/spinner';
import { getPost } from '../../actions/postActions';

class Post extends Component {
	// constructor(props){
	// super(props);
	// post = {};
	// lading = false;
	//}

	//const {post} = state.post;
	componentDidMount() {
		this.props.getPost(this.props.match.params.id);
	}

	render() {
		return (
			<div>
				<h1>Post</h1>
			</div>
		);
	}
}

Post.propTypes = {
	post: PropTypes.object.isRequired,
	getPost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	post: state.post
});
export default connect(mapStateToProps, { getPost })(Post);
