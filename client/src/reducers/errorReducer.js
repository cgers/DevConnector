import { GET_ERRORS } from '../actions/types';

//Empty object for the errors
const intitalState = {};

export default function(state = intitalState, action) {
	//can include payload
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;
		default:
			return state;
	}
}
