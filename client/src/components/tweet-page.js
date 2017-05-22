import React from 'react';
import {Row, Col, Card, CardTitle, Toast, Button} from 'react-materialize';
import { Tweet } from 'react-twitter-widgets'

import {connect} from 'react-redux';

import * as actions from '../actions/index';



class TweetPage extends React.Component {
    constructor(props) {
        super(props);
      
        this.saveTweet = this.saveTweet.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchSeedTweets())
    }

    saveTweet(tweet){
        this.props.dispatch(actions.saveToFavorites(tweet))
    }
    


    render() {
            //an array of what comes back from our Twitter call
            let tweets = this.props.twitterTweets.map((tweet, index) =>
                <Col key={index} s={8} m={4} className='grid-example'>
                    <Card className='medium tweet-card'
                        header={<CardTitle reveal image={tweet.img}></CardTitle>}
                        reveal={<Tweet tweetId={tweet.tweetID} />}>
                        {tweet.text}<br />
                        <Toast toast="Saved to Favorites!">
                            <Button icon='add' floating className='red' 
                                onClick={this.saveTweet.bind(null, tweet)} 
                            />
                        </Toast>
                    </Card>
                </Col>
            );
        

        return (
                <div className="tweet-list">
                    <Row>
                        {tweets}
                    </Row>
                </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    twitterTweets: state.twitterTweets
});
export default connect(mapStateToProps)(TweetPage);
