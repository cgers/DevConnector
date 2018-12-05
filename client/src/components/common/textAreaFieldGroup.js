import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//Functional based component
const textAreaFieldGroup = ({ name, placeholder, value, error, info, onChange, disabled, required }) => {
	return (
		<div className='form-group'>
			<textarea
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				disabled={disabled}
			/>
			{info && <small className='form-text text-muted'>{info}</small>}
			{error && <div className='invalid-feedback'> {error} </div>}
		</div>
	);
};

textAreaFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.string,
	required: PropTypes.string
};

textAreaFieldGroup.defaultProps = {
	disabled: false,
	required: false
};

export default textAreaFieldGroup;
