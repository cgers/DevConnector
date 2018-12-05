import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router-dom'; // To allow redirect after we delete an experience

import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

//This class maps out properties in the state to a form. It is passed the state properties - education
class Education extends Component {
	onDeleteClick(id) {
		this.props.deleteEducation(id);
	}

	render() {
		const education = this.props.education.map((edu) => (
			<tr key={edu._id}>
				<td>{edu.school}</td>
				<td>{edu.degree}</td>
				<td>
					<Moment format='MMM-YYYY'>{edu.datefrom}</Moment> -
					{edu.dateto === null ? ' Current' : <Moment format='MMM-YYYY'>{edu.dateto}</Moment>}
				</td>
				<td>
					<buton onClick={this.onDeleteClick.bind(this, edu._id)} className='btn btn-danger'>
						Delete
					</buton>
				</td>
			</tr>
		));

		return (
			<div>
				<h4 className='mb-4'>Education Credentials</h4>
				<table className='table'>
					<thead>
						<tr>
							<th>School</th>
							<th>Degree</th>
							<th>Years</th>
							<th>Action</th>
						</tr>
						{education}
					</thead>
				</table>
			</div>
		);
	}
}

Education.propTypes = {
	deleteEducation: PropTypes.func.isRequired
};
export default connect(null, { deleteEducation })(Education);
