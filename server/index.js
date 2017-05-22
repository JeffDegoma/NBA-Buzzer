// require('dotenv').config();
const path = require('path');
const express = require('express');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const Twit  = require('twit')
const configAuth = require('./config/auth')
const mongoose = require('mongoose')
const session = require('express-session');
const bodyParser = require('body-parser')
const User = require('./config/models/user');


//database
const configDB = require('./config/database.js')
mongoose.connect(configDB.url)
mongoose.Promise = global.Promise



//Twitter and Google Login
require('./config/passport')(passport)



const app = express();


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


app.use(session({secret: 'ilovescotchscotchyschotch', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());




//Twitter Authenticate
app.get('/api/auth/twitter', passport.authenticate('twitter'), (req, res, next, err) => {
})

//handle callback after twitter has authenticated the user
app.get('/api/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/',
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.twitter.accessToken, {expires: 0});
        res.redirect('/');
    }
);



app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me', passport.authenticate('bearer', { session: false }),(req, res) => {
        res.json({
            user: req.user
        })
    }
);



//Search NBA Tweets
const T = new Twit({
    consumer_key: configAuth.twitterAuth.consumerKey,
    consumer_secret: configAuth.twitterAuth.consumerSecret,
    access_token: configAuth.twitterAuth.access_token,
    access_token_secret: configAuth.twitterAuth.access_token_secret,
}); 

app.get('/api/twitter', (req, res) => {
        // send back data from Twitter
        T.get('search/tweets', 
            { q: 'NBA since:2017-1-11', count: 15 }, 
                function(err, data, response) {
                    // send back an array of objects that contain the profile
                    // img url and tweet_status
                    let tweets = data.statuses.map(function(tweet){
                        let TwitterImageUrl= tweet.user.profile_image_url_https
                        let imageUrl = TwitterImageUrl.replace('_normal' , '')
                        

                        const retTweet = {
                            img: imageUrl,
                            text: tweet.text,
                            created: tweet.created_at,
                            tweetID: tweet.id_str
                        }
                        return retTweet
                    })
                    res.send(tweets)
                })
})





//Route to save tweets into database
app.post('/api/favorites/save', passport.authenticate('bearer', {session: false}), (req,res)=>{
    const tweet = req.body
    const userID = req.user.twitter.id

    //find by userID
    User.findOne({'twitter.id': userID}, ((err, user)=> {
        let favorites = user.twitter.favorites
            if(err){
                console.log("Something wrong when updating data!");
            }

        favorites.push(tweet)

        user.markModified('twitter.favorites')

        user.save()
        res.status(201).json(favorites)

    }));
})


//favorites page
app.get('/api/favorites', passport.authenticate('bearer', {session: false}),(req,res)=>{
    const userID = req.user.twitter.id
    User.findOne({'twitter.id': userID}, ((err, user)=> {

        if(err){
            console.log("Something wrong when updating data!");
        }
        res.status(201).json(user.twitter.favorites)

    }));
})

//delete favorite
app.delete('/api/favorites/delete', passport.authenticate('bearer', {session: false}), (req,res)=>{
        const tweetID = req.body.tweet.tweetID
        const userID = req.user.twitter.id

        User.findOneAndUpdate({'twitter.id': userID}, {$pull: {'twitter.favorites': {'tweet.tweetID': tweetID}}}, {new:true}, ((err, user)=> {
            if(err){
                 console.log("ERROR INSIDE DELETE",err);
            }

            res.status(201).json(user.twitter.favorites)

        }))
})




// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            resolve();
        }).on('error', reject);
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}



if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
