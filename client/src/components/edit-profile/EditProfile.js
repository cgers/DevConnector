import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputGroup from '../common/inputGroup';
import TextAreaFieldGroup from '../common/textAreaFieldGroup';
import TextFieldGroup from '../common/textFieldGroup';
import SelectListGroup from '../common/selectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { withRouter, Link } from 'react-router-dom';
import IsEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
	//Create component state values;
	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			bio: '',
			githubusername: '',
			linkedin: '',
			twitter: '',
			youtube: '',
			instagram: '',
			facebook: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(e) {
		e.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			status: this.state.status,
			skills: this.state.skills,
			bio: this.state.bio,
			githubusername: this.state.githubusername,
			linkedin: this.state.linkedin,
			twitter: this.state.twitter,
			youtube: this.state.youtube,
			instagram: this.state.instagram,
			facebook: this.state.facebook
		};
		//Whenever we call a redux action it is in the props
		this.props.createProfile(profileData, this.props.history);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		} //       profile state.profile object
		if (nextProps.profile.profile) {
			const prof = nextProps.profile.profile;

			//Convert skills array to csv
			const skillsCSV = prof.skills.join(',');

			// If profile field does not exist then we use empty string
			prof.company = !IsEmpty(prof.company) ? prof.company : '';
			prof.website = !IsEmpty(prof.website) ? prof.website : '';
			prof.location = !IsEmpty(prof.location) ? prof.location : '';
			prof.status = !IsEmpty(prof.status) ? prof.status : '';
			prof.githubusername = !IsEmpty(prof.githubusername) ? prof.githubusername : '';
			prof.bio = !IsEmpty(prof.bio) ? prof.bio : '';
			prof.social = !IsEmpty(prof.social) ? prof.social : {};
			prof.twitter = !IsEmpty(prof.social.twitter) ? prof.social.twitter : '';
			prof.facebook = !IsEmpty(prof.social.facebook) ? prof.social.facebook : '';
			prof.linkedin = !IsEmpty(prof.social.linkedin) ? prof.social.linkedin : '';
			prof.instagram = !IsEmpty(prof.social.instagram) ? prof.social.instagram : '';
			prof.youtube = !IsEmpty(prof.social.youtube) ? prof.social.youtube : '';

			//Set components fields state
			this.setState({
				company: prof.company,
				handle: prof.handle,
				website: prof.website,
				location: prof.location,
				status: prof.status,
				skills: skillsCSV,
				githubusername: prof.githubusername,
				bio: prof.bio,
				twitter: prof.twitter,
				facebook: prof.facebook,
				linkedin: prof.linkedin,
				instagram: prof.instagram,
				youtube: prof.youtube
			});
		}
	}

	componentDidMount() {
		//Load the profile into the state
		this.props.getCurrentProfile();
	}

	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder='Twitter profile url'
						name='twitter'
						icon='fab fa-twitter'
						value={this.state.twitter}
						required={false}
						disabled={false}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup
						placeholder='Facebook Page URL'
						name='facebook'
						icon='fab fa-facebook'
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
						required={false}
						disabled={false}
					/>

					<InputGroup
						placeholder='Linkedin Profile URL'
						name='linkedin'
						icon='fab fa-linkedin'
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
						required={false}
						disabled={false}
					/>

					<InputGroup
						placeholder='YouTube Channel URL'
						name='youtube'
						icon='fab fa-youtube'
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
						required={false}
						disabled={false}
					/>

					<InputGroup
						placeholder='Instagram Page URL'
						name='instagram'
						icon='fab fa-instagram'
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
						required={false}
						disabled={false}
					/>
				</div>
			);
		}

		//Select options for status
		const options = [
			{ label: '* Select professional status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Teacher', value: 'Student or Teacher' },
			{ label: 'Inten', value: 'Inten' },
			{ label: 'Other', value: 'Other' }
		];
		return (
			<div className='create-profile'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-8 m-auto'>
							<Link to='/dashboard' className='btn btn-light'>
								Go back
							</Link>
							<h1 className='display-4 text-center'>Edit Profile</h1>

							<small className='d-block pb-3'>* are requied fields</small>
						</div>
					</div>
					<form onSubmit={this.onSubmit}>
						<TextFieldGroup
							name='handle'
							placeholder='* Profile handle'
							value={this.state.handle}
							error={errors.handle}
							info='A unique name for your profile URL.'
							onChange={this.onChange}
							type='text'
							required={true}
							disabled={false}
						/>
						{/* // Other fields here. */}
						<SelectListGroup
							placeholder='Status'
							name='status'
							value={this.state.status}
							onChange={this.onChange}
							options={options}
							required={true}
							disabled={false}
							error={errors.status}
							info='Give us an idea of where you are at in your career'
						/>

						<TextFieldGroup
							placeholder='Company'
							name='company'
							value={this.state.company}
							onChange={this.onChange}
							error={errors.company}
							disabled={false}
							requred={false}
							info='Could be your own company or one you work for'
						/>
						<TextFieldGroup
							placeholder='Website'
							name='website'
							value={this.state.website}
							onChange={this.onChange}
							error={errors.website}
							disabled={false}
							requred={false}
							info='Could be your own website or a company one'
						/>
						<TextFieldGroup
							placeholder='Location'
							name='location'
							value={this.state.location}
							onChange={this.onChange}
							error={errors.location}
							disabled={false}
							requred={false}
							info='City or city and state suggested (eg. Boston, MA)'
						/>
						<TextFieldGroup
							placeholder='* Skills'
							name='skills'
							value={this.state.skills}
							onChange={this.onChange}
							error={errors.skills}
							disabled={false}
							requred={false}
							info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP'
						/>
						<TextFieldGroup
							placeholder='Github Username'
							name='githubusername'
							value={this.state.githubusername}
							onChange={this.onChange}
							error={errors.githubusername}
							disabled={false}
							requred={false}
							info='If you want your latest repos and a Github link, include your username'
						/>

						<TextAreaFieldGroup
							placeholder='Short Bio'
							name='bio'
							value={this.state.bio}
							onChange={this.onChange}
							error={errors.bio}
							info='Tell us a little about yourself'
							required={false}
							disabled={false}
						/>

						<div className='mb-3'>
							<button
								type='button' //without this the page will submit
								className='btn btn-light'
								onClick={() => {
									this.setState((prevState) => ({
										displaySocialInputs: !prevState.displaySocialInputs
									}));
								}}
							>
								Add Social Network Links
							</button>
							<span className='text-muted'>Optional</span>
						</div>

						<div>
							{socialInputs}
							<input
								type='submit'
								value='Submit changes'
								className='btn btn-info btn-block mt-4 Submit'
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

CreateProfile.propTypes = {
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));
