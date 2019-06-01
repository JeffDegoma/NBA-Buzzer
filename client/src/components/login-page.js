import React from 'react';
import { NavItem } from 'react-materialize';
import DemoLogin from './demo-login';

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
		let today = new Date()
		let year = today.getUTCFullYear()
		let month = today.getUTCMonth() + 1
		let day = today.getUTCDate();

        let fromQuery = `${year}-${month}-${day}`
		let toQuery = `${year}-${month}-${day}`
        console.log(fromQuery)

        this.interval = setInterval(this.timer, 1000)
        let url = 'https://newsapi.org/v2/everything?' +
            'q=NBA&' +
            'domains=espn.com&' +
            `from=${fromQuery}` +
            // `to=${toQuery}` +
            'sortBy=publishedAt&' +
            'page=1&' +
            'apiKey=950b36bbafbe4e6592bd748b8d0d0b8b';

        console.log(url)
			let req = new Request(url);
			fetch(req)
			    .then((response) => response.json())
				.then((parsedData) => {
					console.log("DATA IS AN ARRAY OF OBJECTS", parsedData.articles)
					let authorOfNews = parsedData.articles.map((article => article)).slice(0, 10)
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

	renderCTA() {
        if (this.state.timerUp) {
            return (
                <div className="cta">
		     		<div className="cta-content">
		        		<NavItem
		        			className="cta-btn"
		        			href={'/api/auth/twitter'}>
		        				Login with Twitter
		        		</NavItem>
	        		<DemoLogin />
	        		</div>
	        		<br/>
	        		<div className="recent-news">
	        		<h3>Top NBA News</h3>
						<ul>
							{this.state.news.map((article, index) => {
								 return <li className="headlines-list-item" key={index}><a href={article.url} target="blank">{article.title}</a></li>
								})
							}
						</ul>
					</div>
	        	</div>
            );
        } else {
            return null;
        }
    }

	render() {

	    return (
    		<div className="intro">
	    		<Fader>{this.renderShotClock()}</Fader>	     	
	    		<Fader>{this.renderCTA()}</Fader>	     	
			</div>
		);
	}
}


export default LoginPage;

	