import React from 'react';
import {Navbar, NavItem} from 'react-materialize'

export default function Navigation() {

	return(

	<Navbar brand='logo' right>
  		<NavItem href='/api/auth/logout'>Log Out</NavItem>
	</Navbar>
    
     )
}
