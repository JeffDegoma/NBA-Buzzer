import React from 'react';
import { Col, Card, CardTitle, Toast, Button} from 'react-materialize';
import { Tweet } from 'react-twitter-widgets';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
import MainContent from './main-content';


class TweetPage extends React.Component {

    constructor(props) {
        super(props);
        this.saveTweet = this.saveTweet.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(actions.fetchSeedTweets());
    }

    saveTweet(tweet){
        this.props.dispatch(actions.saveToFavorites(tweet));
    }
    
    render() {
        //an array of what comes back from our Twitter call
        const tweets = this.props.twitterTweets.map((tweet, index) =>
            <Col key={index} m={10} s={8} className='grid-example'>
                <Card className='medium tweet-card'
                    header={<CardTitle reveal image={tweet.img}></CardTitle>}
                    reveal={<Tweet tweetId={tweet.tweetID} />}>
                    {tweet.text}
                    <br />
                    <Toast toast="Saved to Favorites!">
                        <Button icon='add' floating className='red' 
                            onClick={this.saveTweet.bind(null, tweet)} 
                        />
                    </Toast>
                </Card>
            </Col>
        );

        return (
            <main>  
                <div className="main">
                    <MainContent />
                    <Col className="tweet-sidebar">
                        {tweets}
                    </Col>
                </div>
            </main>
        );
    }
}

const mapStateToProps = (state, props) => ({
    twitterTweets: state.twitterTweets
});

export default connect(mapStateToProps)(TweetPage);
