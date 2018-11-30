import React, { Component } from 'react';
//import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/textFieldGroup';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}
	//Map state properties to component state properties.
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			});
		}
	}

	onChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};

		this.props.registerUser(newUser, this.props.history);
	}

	render() {
		const { errors } = this.state;

		const { user } = this.props.auth;

		return (
			<div className='register'>
				{user ? user.name : null}
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<h1 className='display-4 text-center'> Sign Up </h1>
							<p className='lead text-center'>Create your DevConnector account</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name='name'
									placeholder='Name'
									value={this.state.name}
									label=''
									error={errors.name}
									info=''
									type='text'
									onChange={this.onChange}
									required={true}
								/>
								<TextFieldGroup
									name='email'
									placeholder='E-Mail address'
									value={this.state.email}
									label=''
									error={errors.email}
									info='This site uses Gravatar so if you want a profile image, use a Gravatar E-Mail'
									type='email'
									onChange={this.onChange}
									required={true}
								/>

								<TextFieldGroup
									name='password'
									placeholder='A strong password'
									value={this.state.password}
									label=''
									error={errors.password}
									info=''
									type='password'
									onChange={this.onChange}
									required={true}
								/>
								<TextFieldGroup
									name='password2'
									placeholder='Confirm strong password'
									value={this.state.password2}
									label=''
									error={errors.password2}
									info=''
									type='password'
									onChange={this.onChange}
									required={true}
								/>

								<input type='submit' className='btn btn-info btn-block mt-4' />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, {
	registerUser
})(withRouter(Register));
