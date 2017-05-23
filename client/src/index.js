import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './components/routes'
import store from './store';
import {Provider} from 'react-redux';


ReactDOM.render (
    <Provider store={store}>
		<Routes />
	</Provider>,
	document.getElementById('root')
);
