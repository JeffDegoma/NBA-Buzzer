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
	    		className="modal"
				trigger={<Button className="cta-btn">View Demo</Button>}
				actions={
				    <div className="button-conditional-container">
				      <Button modal="close" onClick={this.getUserCreds} className="cta-btn" flat waves="light">Login</Button>
				      <Button modal="close" flat waves="light" className="cta-btn">Cancel</Button>
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