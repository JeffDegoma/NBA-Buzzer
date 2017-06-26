import React from 'react';
import { Row, Input, Modal, Button } from 'react-materialize';
import * as actions from '../actions/index';
import { connect } from 'react-redux';


class DemoLogin extends React.Component {
	constructor(props){
		super(props)
		this.getUserCreds = this.getUserCreds.bind(this)
	}

	getUserCreds(){
		const userEmail = this.email.props.value
		const userPassword = this.password.props.value

		this.props.dispatch(actions.modalLogin(userEmail, userPassword))
	}

	render() {
	    return (
	    	<Modal
				header='NBA Buzzer Demo'
				trigger={
					<Button className="social-links" 
						>View Demo
					</Button>}
				actions={
				    <div>
				      <Button modal="close" flat waves="light" className="darken-2">Cancel</Button>
				      <Button modal="close" onClick={this.getUserCreds} flat waves="light">Login</Button>
				    </div>
				}>
				<Row>
				    <Input 
				    	type="email" 
				    	label="Email" 
				    	s={12} 
				    	name="email" 
				    	value="abc@email.com" 
				    	ref={(ref) => { this.email = ref; }} />

				    <Input 
				    	type="password" 
				    	label="password" 
				    	s={12} 
				    	value="123"
				    	ref={(ref) => { this.password = ref; }}/>
				</Row> 
			</Modal>
		);
	}
}

export default connect()(DemoLogin);
