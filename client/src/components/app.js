import React from 'react';
import TweetPage from './tweet-page';
import LoginPage from './login-page';
import Navigation from './navigation';
import PageFooter from './page-footer';
import { connect } from 'react-redux';
import * as actions from '../actions/index';



class App extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.fetchUser())
    }

    render() {
        if (!this.props.user) {
            return <LoginPage />;
        }

        return (
            <div>
                <Navigation favorites={this.props.favorites} />
                <TweetPage />
                <PageFooter />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.twitterUser,
    favorites: state.savedTweets
});

export default connect(mapStateToProps)(App)
