const intitalState = {
	isAuthenticated: false,
	user: {}
};

export default function(state = intitalState, action) {
	//can include payload
	switch (action.type) {
		default:
			return state;
	}
}
