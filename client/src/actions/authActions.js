import { GET_ERRORS, SET_CURRENT_USER } from './types';
import Axios from 'axios';
import sethAuthToken from '../utils/sethAuthToken';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/sethAuthToken';

//Register Action

//Register User - redux thunk allows us to call dispath async
export const registerUser = (userData, history) => (dispatch) => {
	//Post the results on submit via axios
	Axios.post('/api/user/register', userData).then((res) => history.push('/login')).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Login - Get JWT
export const loginUser = (userData) => (dispatch) => {
	Axios.post('/api/user/login', userData)
		.then((res) => {
			const { token } = res.data;
			// Save jwt to localstore
			localStorage.setItem('jwtToken', token);
			//Set token to Authrization header
			sethAuthToken(token);
			//Decode token to get user data
			const decoded = jwt_decode(token);
			dispatch(setCurrentUser(decoded));
			//Set current user
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		);
};

//setCurrentUser
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');

	// Remove auth header for future requests
	setAuthToken(false);

	//Set current user to empty object which will also set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
