import React from 'react';
import * as Cookies from 'js-cookie';
import {Row, Col, Card, CardTitle, Button} from 'react-materialize';
import { Tweet } from 'react-twitter-widgets'

import {connect} from 'react-redux';

import * as actions from '../actions/index';



class TweetPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
        };
        this.saveTweet = this.saveTweet.bind(this)

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
                this.setState({
                    tweets
            })
            }
        );

    }

    saveTweet(tweetID){
        console.log(tweetID)  
        this.props.dispatch(actions.saveToFavorites(tweetID))      
    }
    


    render() {
        //an array of what comes back from our Twitter call
        const tweets = this.state.tweets.map((tweet, index) => 
            //just add a regular card
            
            <Col key={index} s={8} m={3} className='grid-example'>
                <Card className='medium tweet-card'
                    header={<CardTitle reveal image={tweet.img}></CardTitle>}
                    reveal={<Tweet tweetId={tweet.tweetID} />}>
                    {tweet.text} <br />
                    <Button floating className='red' waves='light' icon='add' 
                        onClick={this.saveTweet.bind(null, tweet.tweetID)}
                    />
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

export default connect()(TweetPage);
