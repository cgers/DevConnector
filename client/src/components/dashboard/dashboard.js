import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

class Dashboard extends Component {
	//We want getCurrentProfile to be called immediately
	componentDidMount() {
		this.props.getCurrentProfile();
	}
	render() {
		return <div />;
	}
}

export default connect(null, { getCurrentProfile })(Dashboard);
