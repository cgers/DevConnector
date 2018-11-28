import { SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';

const intitalState = {
	isAuthenticated: false,
	user: {}
};

export default function(state = intitalState, action) {
	//can include payload
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
}
