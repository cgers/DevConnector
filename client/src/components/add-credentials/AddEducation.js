import React, { Component } from 'react';
//Need withRouter because when we submit the form
// to add an education we want to re-direct from the submit action
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup2';
//import textFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { fail } from 'assert';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			school: '',
			degree: '',
			fieldofstudy: '',
			datefrom: '',
			dateto: '',
			current: false, // by default
			description: '',
			errors: {},
			disabled: false // this is not in the data model
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	onSubmit(e) {
		e.preventDefault();

		const eduData = {
			school: this.state.school,
			degree: this.state.degree,
			fieldofstudy: this.state.fieldofstudy,
			datefrom: this.state.datefrom,
			dateto: this.state.dateto,
			current: this.state.current,
			description: this.state.description
		};

		this.props.addEducation(eduData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onCheck(e) {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	}

	render() {
		const { errors } = this.state;
		// is the same as:
		// const errors = this.state.errors;

		return (
			<div className='add-education'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto' />
						<Link to='/dashboard' className='btn btn-light'>
							Go back
						</Link>
						<h1 className='display-4 text-center'>Add Education</h1>
						<p className='lead text-center'>Please add your education below</p>
					</div>
					<small className='d-block pb-3'>* = required fields</small>
					<form onSubmit={this.onSubmit}>
						<TextFieldGroup
							placeholder='* School'
							name='school'
							value={this.state.school}
							onChange={this.onChange}
							error={errors.school}
							//required={true}
							disabled={''}
						/>
						<TextFieldGroup
							name='degree'
							placeholder='* Degree or certification'
							value={this.state.degree}
							error={errors.degree}
							onChange={this.onChange}
							disabled={''}
							//required={true}
						/>
						<TextFieldGroup
							name='fieldofstudy'
							placeholder='* Field of Study'
							value={this.state.fieldofstudy}
							error={errors.fieldofstudy}
							type='text'
							onChange={this.onChange}
							disabled={''}
							//required={false}
						/>
						<h6>From Date</h6>
						<TextFieldGroup
							name='datefrom'
							placeholder='From Date'
							value={this.state.datefrom}
							error={errors.datefrom}
							type='date'
							onChange={this.onChange}
							disabled={''}
							//required={false}
						/>
						<h6>To Date</h6>
						<TextFieldGroup
							name='dateto'
							placeholder='To Date'
							value={this.state.dateto}
							error={errors.dateto}
							type='date'
							onChange={this.onChange}
							disabled={this.state.disabled ? 'disabled' : ''}
							//required={false}
						/>

						<div className='form-check mb-4'>
							<input
								type='checkbox'
								className='form-check-input'
								name='current'
								value={this.state.current}
								checked={this.state.current}
								onChange={this.onCheck}
								id='current'
							/>
							<label htmlFor='current' className='form-check-label'>
								Current Job
							</label>
						</div>
						<TextAreaFieldGroup
							placeholder='Pogram Description'
							name='description'
							value={this.state.description}
							onChange={this.onChange}
							error={errors.description}
							info='Tell us about the the program'
						/>
						<input type='submit' value='Submit' className='btn btn-info btn-block mt-4' />
					</form>
				</div>
			</div>
		);
	}
}

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
