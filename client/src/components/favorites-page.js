import React from 'react';
import { Row, Col, Card, CardTitle, Button, Toast } from 'react-materialize';
import { Tweet } from 'react-twitter-widgets';
import Navigation from './navigation';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import PageFooter from './page-footer';


class FavoritesPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.deleteTweet = this.deleteTweet.bind(this);
    }

    componentDidMount() {
		this.props.dispatch(actions.fetchFavoriteTweets());
	}

	deleteTweet(tweet){
        this.props.dispatch(actions.deleteFromFavorites(tweet));   
    }

	render() {
        const noFavorites = 'You have not added a tweet!'
        const favorites = this.props.tweets.map((data, index) => {
            const tweet = data.tweet
                
                return (
                    <Col key={index} s={8} m={4} className='grid-example'>
                        <Card className='medium tweet-card'
                            header={<CardTitle reveal image={tweet.img}></CardTitle>}
                            reveal={<Tweet tweetId={tweet.tweetID} />}>
                            {tweet.text} 
                            <br />
                            <Toast toast="Deleted!">
                                <Button floating 
                                        className='red' 
                                        waves='light' 
                                        icon='delete' 
                                        onClick={this.deleteTweet.bind(null, tweet)}
                                />
                            </Toast>
                        </Card>
                    </Col>
                );
        });

        return (
            <div className="app-container">
  			   <Navigation favorites={this.props.favorites}/>
                <main>
                    <Row>
                      {this.props.favorites.length ? favorites : <div className="no-favorites">{noFavorites}</div>}
                    </Row>
                </main>
                <PageFooter />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    tweets: state.savedTweets,
    favorites: state.savedTweets
});

export default connect(mapStateToProps)(FavoritesPage);