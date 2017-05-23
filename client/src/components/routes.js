import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './app';
import FavoritesPage from './favorites-page';


export default function Routes() {

	return (
		<Router>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/favorites" component={FavoritesPage} />
			</div>
		</Router>
	);
}

