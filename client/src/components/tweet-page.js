import React from 'react';
import * as Cookies from 'js-cookie';
import Websocket from 'react-websocket';




export default class TweetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            tweets: []
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken');
        fetch('/api/twitter', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(tweets =>
            this.setState({
                tweets
            })
        );

        
    }

     handleData(data) {
      console.log("data", data)
      // this.setState({count: this.state.count + result.movement});
    }


    render() {
        

        const tweets = this.state.tweets.map((tweet, index) =>
            <li key={index}>
                <img src={tweet.img} />
                {tweet.text}
                
            </li>
        );

        return (
         
                <ul className="question-list">
                    {tweets}

                </ul>
                // <Websocket url='ws://localhost:8080' 
                //     onMessage={this.handleData.bind(this)} />
       
        );
    }
}
