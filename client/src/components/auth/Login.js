import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
//import classnames from 'classnames';
import TextFieldGroup from '../common/textFieldGroup';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();

		const userData = {
			email: this.state.email,
			password: this.state.password
		};

		this.props.loginUser(userData);
	}

	render() {
		const { errors } = this.state;
		return (
			<div className='login'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto col-lg-4'>
							<h1 className='display-4 text-center'>Log In</h1>
							<p className='lead text-center'>Sign in to your DevConnector account -</p>
							<form onSubmit={this.onSubmit}>
								<TextFieldGroup
									name='email'
									placeholder='E-Mail Address'
									value={this.state.email}
									label=''
									error={errors.email}
									info=''
									type='email'
									onChange={this.onChange}
									required={true}
									disabled={false}
								/>
								{/* <div className='form-group'>
									<input
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.email
										})}
										type='email'
										placeholder='E-Mail Address'
										name='email'
										value={this.state.email}
										onChange={this.onChange}
										//required
									/>
									{errors.email && <div className='invalid-feedback'> {errors.email} </div>}
								</div> */}
								<TextFieldGroup
									name='password'
									placeholder='Password'
									value={this.state.password}
									label=''
									error={errors.password}
									info=''
									type='password'
									onChange={this.onChange}
									required={true}
									disabled={false}
								/>
								{/* <div className='form-group'>
									<input
										className={classnames('form-control form-control-lg', {
											'is-invalid': errors.password
										})}
										type='password'
										placeholder='Password'
										name='password'
										value={this.state.password}
										onChange={this.onChange}
										//required
									/>
									{errors.password && <div className='invalid-feedback'> {errors.password} </div>}
								</div> */}
								<input type='submit' className='btn btn-info btn-block mt-4' />
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
