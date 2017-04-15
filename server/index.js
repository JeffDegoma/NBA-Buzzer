const path = require('path');
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const Twit  = require('twit')
const configAuth = require('./config/auth')



const secret = "ftvtLzywLJ2DInWS_d_1P9n-"

const app = express();

const database = {
};

app.use(passport.initialize());

passport.use(
    new GoogleStrategy({
        clientID:  '510905071248-bhcu7le33dpdsikvgih5nioivq6lor4l.apps.googleusercontent.com',
        clientSecret: secret,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        // Job 1: Set up Mongo/Mongoose, create a User model which store the
        // google id, and the access token
        // Job 2: Update this callback to either update or create the user
        // so it contains the correct access token
        const user = database[accessToken] = {
            googleId: profile.id,
            accessToken: accessToken
        };
        return cb(null, user);
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            // Job 3: Update this callback to try to find a user with a 
            // matching access token.  If they exist, let em in, if not,
            // don't.
            if (!(token in database)) {
                return done(null, false);
            }
            return done(null, database[token]);
        }
    )
);

app.get('/api/auth/google',
    passport.authenticate('google', {scope: ['profile']}));

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.redirect('/');
    }
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json({
        googleId: req.user.googleId
    })
);

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 56'])
);







const T = new Twit({
    consumer_key: configAuth.twitterAuth.consumerKey,
    consumer_secret: configAuth.twitterAuth.consumerSecret,
    access_token: configAuth.twitterAuth.access_token,
    access_token_secret: configAuth.twitterAuth.access_token_secret,
}); 











app.get('/api/twitter', (req, res) => {
    // send back data from Twitter
        T.get('search/tweets', 
                { q: 'NBA since:2017-1-11', count: 1000, filter: 'native_video' }, 
                function(err, data, response) {
                    // send back an array of objects that contain the profile
                    // img url and tweet_status
                    const tweets = data.statuses.map(function(tweet){
                        // console.log(tweet.user.profile_image_url_https)
                        // console.log(tweet.text)
                        const retTweet = {
                            img: tweet.user.profile_image_url_https,
                            text: tweet.text,
                            created: tweet.created_at

                        }
                        return retTweet
                    })

                    // const tweets = data.statuses.map(function(tweet){
                    //     if(tweet.entities.media) {
                    //         console.log(tweet.entities.media[0])    
                    //     }
                        
                    // })
                // console.log(data)
                res.send(tweets)
            })


})



// T.get('search/tweets', 
//         { q: 'NBA since:2017-1-11', count: 1000, filter: 'native_video' }, 
//         function(err, data, response) {
//             // send back an array of objects that contain the profile
//             // img url and tweet_status
//             // const tweets = data.statuses.map(function(tweet){
//             //     // console.log(tweet.user.profile_image_url_https)
//             //     // console.log(tweet.text)
//             //     const retTweet = {
//             //         img: tweet.user.profile_image_url_https,
//             //         text: tweet.text
//             //     }
//             //     return retTweet
//             // })

//             data.statuses.map(function(tweet){
//                 // if(tweet.entities.media) {
//                     console.log(tweet)
//                     // console.log(tweet.entities.media[0])    
//                 // }
                
//             })
            
//         // res.send(tweets)
//     })















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
