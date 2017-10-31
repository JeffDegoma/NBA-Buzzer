import React from 'react';
import { NavItem } from 'react-materialize';
import DemoLogin from './demo-login';


export default function LoginPage() {

    return (
    		<div className="intro">
    			<div className="content-container">
		     		<div className="cta">
		        		<NavItem 
		        			className="social-links" 
		        			href={'/api/auth/twitter'}>
		        				Login with Twitter
		        		</NavItem>
		        		<DemoLogin />
		        	</div>
		        </div>
			</div>
	);
}



	