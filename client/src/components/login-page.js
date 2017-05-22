import React from 'react';
import {Navbar, NavItem} from 'react-materialize'



export default function LoginPage() {

    return(
    	<div className="nav">
	     	<Navbar className="nav-background">
	     		<div className="nav-container">
	        		<NavItem className="social-links" href={'/api/auth/twitter'}>Login with Twitter</NavItem>
	        	</div>
			</Navbar>
		</div>
	)
     
}



	