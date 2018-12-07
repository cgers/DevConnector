import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/sethAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/dashboard';
import createProfile from './components/create-profile/createProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import NotFound from './components/notfound/NotFound';
import Posts from './components/posts/Posts';

// we need to load switch to wrap the private routes.
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { clearCurrentProfile } from './actions/profileActions';
import './App.css';

import PrivateRoute from './components/common/privateRoute';

//Check for existing jwt token
if (localStorage.jwtToken) {
	//Set auth token header auth
	//const token = localStorage.jwtToken;
	setAuthToken(localStorage.jwtToken);
	//Decode and get user info and expiration
	const decoded = jwt_decode(localStorage.jwtToken);
	//Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	//check for expired token

	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		//Logout user
		store.dispatch(logoutUser());
		//TODO clear current profile
		store.dispatch(clearCurrentProfile());
		// Re-direct to login page
		window.localStorage.href = '/login';
	}
}
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div className='App'>
						<Navbar />
						<Route exact path='/' component={Landing} />
						<div className='container'>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/profiles' component={Profiles} />
							<Route exact path='/profile/:handle' component={Profile} />

							<Route exact path='/not-found' component={NotFound} />

							<Switch>
								<PrivateRoute exact path='/dashboard' component={Dashboard} />
							</Switch>

							<Switch>
								<PrivateRoute exact path='/create-profile' component={createProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/edit-profile' component={EditProfile} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/add-experience' component={AddExperience} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/add-education' component={AddEducation} />
							</Switch>
							<Switch>
								<PrivateRoute exact path='/feed' component={Posts} />
							</Switch>
						</div>
						<Footer />
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
