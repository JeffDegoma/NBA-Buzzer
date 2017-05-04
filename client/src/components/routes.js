import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './app';



export default function Routes (){

		return(
			<Router>
				<div>
					<Route path="/" component={App} />
				</div>
			</Router>
		)
	}

