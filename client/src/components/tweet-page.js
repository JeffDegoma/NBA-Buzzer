import React from 'react';
import * as Cookies from 'js-cookie';
import Websocket from 'react-websocket';
import {Row, Col, Card, Chip, CardTitle} from 'react-materialize';
import { Tweet } from 'react-twitter-widgets'


// const socket = io();


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
        }).then(tweets => {
            console.log(tweets)
            this.setState({
                tweets
            })
            }
        );

    }

    handleData(data) {
        console.log("data", data)
        // socket.on('message', (tweet) => console.log(tweet));
      // this.setState({count: this.state.count + result.movement});
    }


    render() {
        //an array of what comes back from our Twitter call
        const tweets = this.state.tweets.map((tweet, index) => 
            //just add a regular card
            
            <Col  s={8} m={3} className='grid-example'>
                <Card className='medium tweet-card'
                    header={<CardTitle reveal image={tweet.img}></CardTitle>}
                    reveal={<Tweet tweetId={tweet.tweetID} />}>
                    {tweet.text}
                </Card>
            </Col>
            
        );

        return (

                <div className="tweet-list">
                    <Row>
                        {tweets}
                    </Row>
                </div>
                // <Websocket url='ws://localhost:8080' 
                //     onMessage={this.handleData.bind(this)} />
       
        );
    }
}
