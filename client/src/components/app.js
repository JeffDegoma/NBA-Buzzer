import React from 'react';
import TweetPage from './tweet-page';
import LoginPage from './login-page';
import Navigation from './navigation';
import PageFooter from './page-footer';
import { connect } from 'react-redux';
import * as actions from '../actions/index';



class App extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.fetchUsers())
    }

    render() {
        if (!this.props.users) {
            return <LoginPage />;
        }

        return (
            <div className="app-container">
                <Navigation />
                    <TweetPage />
                <PageFooter />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    users: state.twitterUsers
});

export default connect(mapStateToProps)(App)
