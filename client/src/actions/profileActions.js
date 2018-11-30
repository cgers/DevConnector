import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from './types';
import axios from 'axios';

//Get the profile of current user
export const getCurrentProfile = () => (dispach) => {
	dispach(setProfileLoading());
	axios
		.get('/api/profile')
		.then((res) =>
			dispach({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			// return an empty object if there is not a profile
			dispach({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

// Profile Loading
export const setProfileLoading = () => {
	return {
		type: PROFILE_LOADING
	};
};

// Clear Loading
export const clearCurrentProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};
