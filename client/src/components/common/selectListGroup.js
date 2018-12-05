import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//Functional based component
const selectListGroup = ({ name, value, error, info, onChange, required, disabled, options }) => {
	const SelectOptions = options.map((option) => (
		<option key={option.label} value={option.value}>
			{option.label}
		</option>
	));

	return (
		<div className='form-group'>
			<select
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				name={name}
				value={value}
				onChange={onChange}
				options={options}
				// disabled={disabled}
				// required={required}
			>
				{SelectOptions}
			</select>
			{info && <small className='form-text text-muted'>{info}</small>}
			{error && <div className='invalid-feedback'> {error} </div>}
		</div>
	);
};

selectListGroup.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	// required: PropTypes.bool,
	// disabled: PropTypes.bool,
	options: PropTypes.array.isRequired
};

selectListGroup.defaultProps = {
	// required: false,
	// disabled: false
};

export default selectListGroup;
