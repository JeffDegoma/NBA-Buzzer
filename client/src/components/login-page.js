import React from 'react';
import {Navbar, NavItem} from 'react-materialize'



export default function LoginPage() {


     return(


    
      <div className="nav">
     	  <Navbar brand="logo" className="nav-extended nav-full-header" right>

          <NavItem href={'/api/auth/google'}>Login with Google</NavItem>
          <NavItem href={'/api/auth/twitter'}>Login with Twitter</NavItem>

        </Navbar>

        <img src='//cdn.shopify.com/s/files/1/1775/8583/t/1/assets/cityscape-line2.png?12295265317662713736" alt="cityscape'/>


     </div>

		  


	)
     
}
