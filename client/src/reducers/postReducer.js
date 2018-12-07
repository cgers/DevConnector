import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from '../actions/types';

//Empty object for the errors
const intitalState = {
	posts: [], // An array of posts
	post: {}, // A singular object or post
	loading: false // Set spinner to not  loading
};

export default function(state = intitalState, action) {
	//can include payload
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case GET_POST:
			return {
				...state,
				post: action.payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				//       latest post   , existing posts
				posts: [ action.payload, ...state.posts ]
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload) //removing the deleted id from the state, which remains immutable
			};
		default:
			return state;
	}
}
