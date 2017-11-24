import React from 'react';
import { NavItem } from 'react-materialize';
import DemoLogin from './demo-login';


class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds:  5
		}
		this.timer = this.timer.bind(this)
	}

	timer() {
		this.setState({seconds: this.state.seconds - 1})
		if(this.state.seconds <= 0){
			clearInterval(this.interval)
		}
	}

	componentDidMount() {
		this.interval = setInterval(this.timer, 1000)
		var url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2017-11-24&' +
          'sortBy=popularity&' +
          'apiKey=950b36bbafbe4e6592bd748b8d0d0b8b';

			var req = new Request(url);

			fetch(req)
			    .then((response) => response.json())
				.then(function(parsedData) {
					console.log(parsedData.articles)
				})
	}

	componentWillMount() {
		clearInterval(this.interval)
	}


	render() {
	    return (
    		<div className="intro">
	     		<div className="cta">
	        		<div className="shot-clock"><span>{this.state.seconds}</span></div>
		     		<div className="cta-content">
		        		<NavItem
		        			className="cta-btn"
		        			href={'/api/auth/twitter'}>
		        				Login with Twitter
		        		</NavItem>
	        		<DemoLogin />
	        		</div>
	        	</div>
			</div>
		);
	}
}


export default LoginPage;

	