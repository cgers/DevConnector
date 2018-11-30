import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from '../actions/types';

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
				loading: true //sets Loading to true
			};
		case GET_PROFILE:
			return {
				...state, //Current state
				profile: action.payload,
				loading: false //sets Loading to true
			};
		case CLEAR_CURRENT_PROFILE:
			return {
				...state, //Current state
				profile: null,
				loading: false //sets Loading to true
			};
		default:
			return state;
	}
}
