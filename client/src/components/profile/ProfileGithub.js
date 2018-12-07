import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProfileGithub extends Component {
	constructor(props) {
		super(props);
		this.state = {
			clientId: '406200fd6c2961ac8ef6',
			clientSecret: 'cb7d1dc06b757ac707147b165bcd8ac3148a2ef9',
			count: 5,
			sort: 'created: asc',
			repos: []
		};
	}

	componentDidMount() {
		const { username } = this.props;
		const { clientId, clientSecret, count, sort } = this.state;

		fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		)
			.then((res) => res.json()) //mappinig res to json
			.then((data) => {
				if (this.refs.refProfileGithub) {
					this.setState({ repos: data });
				}
			})
			.catch((err) => console.log(err));
	}
	render() {
		const { repos } = this.state;
		const repoItems = repos.map((repo) => (
			<div key={repo.id} className='card card-body mb-2'>
				<div className='row'>
					<div className='col-md-6'>
						<h4>
							<a href={repo.html_url} className='text-info' target='_blank' rel='noopener noreferrer'>
								{repo.name}
							</a>
						</h4>
						<p>{repo.description}</p>
					</div>
					<div className='col-md-6'>
						<span className='badge badge-info mr-1'>Stars: {repo.stargazers_count}</span>
						<span className='badge badge-secondary mr-1'>Watchers: {repo.watcherss_count}</span>
						<span className='badge badge-success'>Forks: {repo.forks_count}</span>
					</div>
				</div>
			</div>
		));
		return (
			<div ref='refProfileGithub'>
				<hr />
				<h3 className='mb-4'>Latest Github Repos</h3>
				{repoItems}
			</div>
		);
	}
}

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired
};

export default ProfileGithub;
