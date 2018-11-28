import axios from 'axios';

const setAuthToken = (token) => {
	if (token) {
		//Apply Authorization to every header request.
		axios.defaults.headers.common['Authorization'] = token;
	} else {
		//Delete Authorization header.
		delete axios.defaults.headers.common['Authorization'];
	}
};

export default setAuthToken;
