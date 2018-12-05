import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItems from './ProfileItems';

class Profiles extends Component {
	componentDidMount() {
		this.props.getProfiles();
	}

	render() {
		const { profiles, loading } = this.props.profile;

		let profileItems;

		if (profiles === null || loading) {
			profileItems = <Spinner />;
		} else {
			if (profiles.length > 0) {
				profileItems = profiles.map((singleprofile) => (
					<ProfileItems key={singleprofile._id} profile={singleprofile} />
				));
			} else {
				profileItems = <h4>No profile information found ...</h4>;
			}
		}
		return (
			<div className='profiles'>
				<div className='container'>
					<div className='row'>
						<div className='col-md-12'>
							<h1 className='display-4 text-center'>DevConnector Profiles</h1>
							<p className='lead text-center'>Browse and connect with developers</p>
							{profileItems}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Profiles.propTypes = {
	getProfiles: PropTypes.func.IsRequired,
	profile: PropTypes.object.IsRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);