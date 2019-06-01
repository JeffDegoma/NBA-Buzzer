import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/index';



class MainContent extends React.Component {
        constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        
        this.handleInputChange = this.handleInputChange.bind(this)
        this.getSearch = this.getSearch.bind(this)
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            search: value
        })

    }


    //get value of input and dispatch to ajax
    getSearch(e) {
        e.preventDefault()
        const query = this.state.search
        console.log(query)
        // this.props.dispatch(actions.fetchSeedTweets());
    }

    render() {

        return (
                <div className="main-content">
                <form onSubmit={this.getSearch}>
                   <input type="text" name="search" onChange={this.handleInputChange} value={this.state.search}  />
                </form>
                </div>
        );
    }
}


const mapStateToProps = (state, props) => ({
    twitterTweets: state.twitterTweets
});
export default connect(mapStateToProps)(MainContent);

