import { ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST } from './types';
import axios from 'axios';

//Add Post
export const addPost = (postData) => (dispach) => {
	axios.post('/api/posts', postData).then((res) => dispach({ type: ADD_POST, payload: res.data })).catch((err) =>
		dispach({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Get Posts
export const getPosts = () => (dispach) => {
	dispach(setPostLoading());
	axios.get('/api/posts').then((res) => dispach({ type: GET_POSTS, payload: res.data })).catch((err) =>
		dispach({
			type: GET_POSTS,
			payload: {}
		})
	);
};

//Add Like
export const addLike = (id) => (dispach) => {
	axios.post(`/api/posts/like/${id}`).then((res) => dispach(getPosts())).catch((err) =>
		dispach({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Remove Like
export const removeLike = (id) => (dispach) => {
	axios.post(`/api/posts/unlike/${id}`).then((res) => dispach(getPosts())).catch((err) =>
		dispach({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

export const addLike1 = (id) => (dispatch) => {
	axios.post(`/api/posts/like/${id}`).then((res) => dispatch(getPosts())).catch((err) =>
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Delete Post
export const deletePost = (id) => (dispach) => {
	axios.delete(`/api/posts/${id}`).then((res) => dispach({ type: DELETE_POST, payload: id })).catch((err) =>
		dispach({
			type: GET_POSTS,
			payload: err.response.data
		})
	);
};

//Set loading state
export const setPostLoading = () => {
	return {
		type: POST_LOADING
	};
};
