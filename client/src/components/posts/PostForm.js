import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TAFG from '../common/TextAreaFieldGroup2';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		const { user } = this.props.auth;
		const newPost = {
			text: this.state.text,
			name: user.name,
			avatar: user.avatar
		};
		this.props.addPost(newPost);
		this.setState({ text: '' });
	}
	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({ errors: newProps.errors });
		}
	}
	render() {
		const { errors } = this.state;

		return (
			<div className='post-form mb-3'>
				<div className='card card-info'>
					<div className='card-header bg-info text-white'>Say Somthing...</div>
					<div className='card-body'>
						<form onSubmit={this.onSubmit}>
							<div className='form-group'>
								<TAFG
									onChange={this.onChange}
									placeholder='Create a post'
									name='text'
									value={this.state.text}
									error={errors.text}
								/>
							</div>
							<button type='submit' className='btn btn-dark'>
								Submit Post
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};
export default connect(mapStateToProps, { addPost })(PostForm);
