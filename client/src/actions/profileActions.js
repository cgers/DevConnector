import {
	GET_PROFILE,
	GET_PROFILES,
	PROFILE_LOADING,
	CLEAR_CURRENT_PROFILE,
	GET_ERRORS,
	SET_CURRENT_USER
} from './types';
import axios from 'axios';

//Get the profile of current user
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile')
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			// return an empty object if there is not a profile
			dispatch({
				type: GET_PROFILE,
				payload: {}
			})
		);
};

//Get all profiles
// Get all profiles
export const getProfiles = () => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get('/api/profile/all')
		.then((res) =>
			dispatch({
				type: GET_PROFILES,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILES,
				payload: null
			})
		);
};

// export const getProfiles = () => (dispatch) => {
// 	dispatch(setProfileLoading());
// 	axios
// 		.get('/api/profile/all')
// 		.then((res) =>
// 			dispatch({
// 				type: GET_PROFILES, //If successful we want to get all ProfileS - plural
// 				payload: res.data // an array of profiles
// 			})
// 		)
// 		.catch((err) =>
// 			// return an empty object if there is not a profile
// 			dispatch({
// 				type: GET_PROFILES,
// 				payload: null
// 			})
// 		);
// };

//Get all get Profile by Handle
export const getProfilebyHandle = (handle) => (dispatch) => {
	dispatch(setProfileLoading());
	axios
		.get(`/api/profile/handle/${handle}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			// return an empty object if there is not a profile
			dispatch({
				type: GET_PROFILE,
				payload: null
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

//Delete Account and Profile
export const deleteAccount = () => (dispatch) => {
	if (window.confirm('Are you certain? This cannot be undone.')) {
		axios
			.delete('/api/profile')
			.then((res) =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

//Delete Account and Profile
export const deleteExperience = (id) => (dispatch) => {
	if (window.confirm('Are you certain? This cannot be undone.')) {
		axios
			.delete(`/api/profile/experience/${id}`)
			.then((res) =>
				dispatch({
					type: GET_PROFILE,
					payload: res.data
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

//Delete Account and Profile
export const deleteEducation = (id) => (dispatch) => {
	if (window.confirm('Are you certain? This cannot be undone.')) {
		axios
			.delete(`/api/profile/education/${id}`)
			.then((res) =>
				dispatch({
					type: GET_PROFILE,
					payload: res.data
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERRORS,
					payload: err.response.data
				})
			);
	}
};

// Create Profile
export const createProfile = (profileData, history) => (dispatch) => {
	axios.post('/api/profile', profileData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Add experience
export const addExperience = (expData, history) => (dispatch) => {
	axios.post('/api/profile/experience', expData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Add education
export const addEducation = (eduData, history) => (dispatch) => {
	axios.post('/api/profile/education', eduData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};
