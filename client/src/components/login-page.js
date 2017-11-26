import React from 'react';
import { NavItem } from 'react-materialize';
import DemoLogin from './demo-login';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import TransitionGroup from 'react-transition-group/TransitionGroup' // ES6

import Fader from './Fader'



class LoginPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds:  5,
			news: [],
			timerUp: false
		}
		this.timer = this.timer.bind(this)
	}


	timer() {
		this.setState({seconds: this.state.seconds - 1})
		if(this.state.seconds <= 0){
			clearInterval(this.interval)
			this.setState({timerUp: !this.state.timerUp})
		}
	}

	componentDidMount() {
		this.interval = setInterval(this.timer, 1000)
		var url = 'https://newsapi.org/v2/top-headlines?' +
			'domains=espn.com&' + 
			'q=NBA&' +
			'from=2017-11-24&' +
			'sortBy=popularity&' +
			'apiKey=950b36bbafbe4e6592bd748b8d0d0b8b';

			var req = new Request(url);
			fetch(req)
			    .then((response) => response.json())
				.then((parsedData) => {
					console.log("DATA IS AN ARRAY OF OBJECTS", parsedData.articles)
					let authorOfNews = parsedData.articles.map((article => article))
					this.setState({news: authorOfNews})
				})
	}

	componentWillMount() {
		clearInterval(this.interval)
	}

	//this component gets rendered if the timer is up otherwise, return null
	renderShotClock() {
        if (!this.state.timerUp) {
            return (
                <div className="shot-clock" key={1}>
                    {this.state.seconds}
                </div>
            );
        } else {
            return null;
        }
    }


	render() {
		var className = this.state.timerUp ? 'shot-clock-display' : 'shot-clock';
		var example = this.state.timerUp ? 'div' : 'shot-clock-display'

	    return (
    		<div className="intro">
	     		<div className="cta">
	        		<Fader>{this.renderShotClock()}</Fader>

		     		<div className="cta-content">
		        		<NavItem
		        			className="cta-btn"
		        			href={'/api/auth/twitter'}>
		        				Login with Twitter
		        		</NavItem>
	        		<DemoLogin />
	        		</div>
	        	</div>

	        {/*	<TransitionGroup
	        		component={example}
	        		transitionName="example"
	        		className="recent-news">
						<ul>
							{this.state.news.map((article, index) => {
								 return <li className="headlines-list-item" key={index}><a href={article.url} target="blank">{article.title}</a></li>
								})
							}
						</ul>
        		</TransitionGroup>*/}

			</div>
		);
	}
}


export default LoginPage;

	