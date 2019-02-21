import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {createStore} from "redux";
import{ Route, BrowserRouter } from "react-router-dom";
import rootReducer from './redux/reducers';
import {Provider} from 'react-redux';
import UserProfile from './components/userProfile/userProfile';
import Login from './components/login/login';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <div>
            <Route exact path='/' component={Login} />
            <Route  path='/profile' component={UserProfile} />
        </div>
    </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
