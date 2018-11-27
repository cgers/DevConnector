import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

//array of middleware
const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware),
    //this is for the redux dev tools
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
export default store;
