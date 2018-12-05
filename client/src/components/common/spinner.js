import React from 'react';
import spinnerImage from './spinner.gif';

export default () => {
	return (
		<div>
			<img
				src={spinnerImage}
				alt='Loading profile ...'
				style={{ width: '200px', margin: 'auto', display: 'block' }}
			/>
		</div>
	);
};
