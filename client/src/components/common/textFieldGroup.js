// import React from 'react';
// import classnames from 'classnames';
// import PropTypes from 'prop-types';

// const TextFieldGroup = ({ name, placeholder, value, label, error, info, type, onChange, disabled }) => {
// 	return (
// 		<div className='form-group'>
// 			<input
// 				type={type}
// 				className={classnames('form-control form-control-lg', {
// 					'is-invalid': error
// 				})}
// 				placeholder={placeholder}
// 				name={name}
// 				value={value}
// 				onChange={onChange}
// 				disabled={disabled}
// 			/>
// 			{info && <small className='form-text text-muted'>{info}</small>}
// 			{error && <div className='invalid-feedback'>{error}</div>}
// 		</div>
// 	);
// };

// TextFieldGroup.propTypes = {
// 	name: PropTypes.string.isRequired,
// 	placeholder: PropTypes.string,
// 	value: PropTypes.string.isRequired,
// 	info: PropTypes.string,
// 	error: PropTypes.string,
// 	type: PropTypes.string.isRequired,
// 	onChange: PropTypes.func.isRequired,
// 	disabled: PropTypes.string
// };

// TextFieldGroup.defaultProps = {
// 	type: 'text'
// };

// export default TextFieldGroup;

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//Functional based component
const textFieldGroup = ({ name, placeholder, value, error, info, type, onChange, disabled, required }) => {
	return (
		<div className='form-group'>
			<input
				className={classnames('form-control form-control-lg', {
					'is-invalid': error
				})}
				type={type}
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

textFieldGroup.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.string.isRequired,
	error: PropTypes.string,
	info: PropTypes.string,
	type: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	required: PropTypes.bool
};

textFieldGroup.defaultProps = {
	type: 'text'
};

export default textFieldGroup;
