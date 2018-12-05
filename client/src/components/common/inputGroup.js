import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//Functional based component
const inputGroup = ({ name, placeholder, value, error, onChange, icon }) => {
	return (
		<div className='input-group mb-3'>
			<div className='input-group-prepend'>
				<span className='input-group-text'>
					<i className={icon} />
				</span>
			</div>
			<input
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				icon={icon}
			/>
			{error && <div className='invalid-feedback'> {error} </div>}
		</div>
	);
};

inputGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	icon: PropTypes.string,
	type: PropTypes.string.isRequired
};

inputGroup.defaultProps = {
	type: 'text'
};

export default inputGroup;
