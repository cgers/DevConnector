import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import ProfileGithub from './ProfileGithub';
import { getProfilebyHandle } from '../../actions/profileActions';

import Spinner from '../common/spinner';

class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfilebyHandle(this.props.match.params.handle);
		}
	}

	render() {
		const { profile, loading } = this.props.profile;

		let profileContent;

		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div>
					<div className='row'>
						<div className='col-md-6'>
							<Link to='/profiles' className='btn bnt-light float-left'>
								Back to Profiles
							</Link>
						</div>
						<div className='col-md-6' />
					</div>
					<ProfileHeader profile={profile} />
					<ProfileAbout />
					<ProfileCreds />
					<ProfileGithub />
				</div>
			);
		}

		return (
			<div>
				<div className='profile'>
					<div className='container'>
						<div className='row' />
						<div className='col-md-12'>{profileContent}</div>
					</div>
				</div>
			</div>
		);
	}
}

Profile.propTypes = {
	getProfilebyHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfilebyHandle })(Profile);
