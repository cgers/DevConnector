import React, { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
	render() {
		const { education, experience } = this.props;

		const ExpItems = experience.map((exp) => (
			<li key={exp._id} className='list-group-item'>
				<h4>{exp.company}</h4>
				<p>
					<Moment format='MMM-YYYY'>{exp.datefrom}</Moment> to
					{exp.dateto === null ? (
						' Now'
					) : (
						<span>
							{' '}
							<Moment format='MMM-YYYY'>{exp.dateto}</Moment>{' '}
						</span>
					)}
				</p>
				<p>
					<strong>Position: </strong>
					{exp.title}
				</p>
				<p>
					{exp.location === '' ? null : (
						<span>
							<strong>Location: </strong>
							{exp.location}
						</span>
					)}
				</p>
				<p>
					{exp.description === '' ? null : (
						<span>
							<strong>Description: </strong>
							{exp.description}
						</span>
					)}
				</p>
			</li>
		));

		const EduItems = education.map((edu) => (
			<li key={edu._id} className='list-group-item'>
				<h4>{edu.school}</h4>
				<p>
					<Moment format='MMM-YYYY'>{edu.datefrom}</Moment> to
					{edu.dateto === null ? (
						' Now'
					) : (
						<span>
							{' '}
							<Moment format='MMM-YYYY'>{edu.dateto}</Moment>
						</span>
					)}
				</p>
				<p>
					<strong>Degree: </strong>
					{edu.degree}
				</p>
				<p>
					<strong>Field of Study: </strong>
					{edu.fieldofstudy}
				</p>
				<p>
					{edu.description === '' ? null : (
						<span>
							<strong>Description: </strong>
							{edu.description}
						</span>
					)}
				</p>
			</li>
		));

		return (
			<div className='profileCreds'>
				<div className='row'>
					<div className='col-md-6'>
						<h3 className='text-center text-info'>Experience</h3>
						{experience.length > 0 ? (
							<ul className='list-group'>{ExpItems}</ul>
						) : (
							<p className='text-center'>No experience provided.</p>
						)}
					</div>
					<div className='col-md-6'>
						<h3 className='text-center text-info'>Education</h3>
						{experience.length > 0 ? (
							<ul className='list-group'>{EduItems}</ul>
						) : (
							<p className='text-center'>No education provided.</p>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileCreds;
