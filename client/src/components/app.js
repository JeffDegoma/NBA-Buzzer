import React from 'react';
import * as Cookies from 'js-cookie';
import TweetPage from './tweet-page';
import LoginPage from './login-page';
import Navigation from './navigation';
import PageFooter from './page-footer';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        const accessToken = Cookies.get('accessToken')
        if (accessToken) {
            fetch('/api/me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }).then(res => {
                if (!res.ok) {
                    if (res.status !== 401) {
                        // Unauthorized, clear the cookie and go to
                        // the login page
                        Cookies.remove('accessToken');
                        return;
                    }
                    throw new Error("ERROR!!", res.statusText);
                }
                return res.json();
            }).then(currentUser => {
                    this.setState({
                        currentUser
                    });
                }
            );
        }
    }

    render() {
        if (!this.state.currentUser) {
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

export default App;
