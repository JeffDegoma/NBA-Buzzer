import React from 'react';
import {Navbar, NavItem} from 'react-materialize'


export default function Navigation() {
	
	return(
		<Navbar className='nav-extended nav-full-header social-links' brand="NBA" right>
			<NavItem href='/favorites'>Favorites</NavItem> 
	  		<NavItem href='/api/auth/logout'>Log Out</NavItem> 
		</Navbar>
    )
}



