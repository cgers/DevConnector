import { GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';

const initialState = {
	profile: null,
	profiles: null, // an array of profiles
	loading: false // while it's fetching it will be true.
};

//Basic setup of a reducer
export default function(state = initialState, action) {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state, //Current state
				loading: true
			};
		case GET_PROFILE:
			return {
				...state, //Current state
				profile: action.payload,
				loading: false
			};
		case GET_PROFILES:
			return {
				...state, //Current state
				profiles: action.payload, // note we want the profiles object to be filled not the profile object
				loading: false //Loading is set to true right before we make the request so we are setting it back to false since we got the information we require.
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state, //Current state
				profile: null,
				loading: false
			};
		default:
			return state;
	}
}
