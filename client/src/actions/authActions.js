import { GET_ERRORS } from './types';
import Axios from 'axios';

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
