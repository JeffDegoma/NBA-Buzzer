import React from 'react';
import * as Cookies from 'js-cookie';
import Websocket from 'react-websocket';
import {Row, Col, Card, CardTitle} from 'react-materialize';





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
        //an array of what comes back from our Twitter call
        const tweets = this.state.tweets.map((tweet, index) =>

            //just add a regular card
            <Row>
                <Col s={6} m={6} className='grid-example'>
                    <Card className='large'
                        header={<CardTitle image={tweet.img}></CardTitle>}
                        title={tweet.text}>
                    </Card>
                </Col>
            </Row>
        );

        return (

                <div className="tweet-list">
                    {tweets}
                </div>
                // <Websocket url='ws://localhost:8080' 
                //     onMessage={this.handleData.bind(this)} />
       
        );
    }
}
