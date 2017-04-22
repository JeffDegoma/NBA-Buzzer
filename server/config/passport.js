
const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const Twit  = require('twit')
const User = require('./models/user');

const configAuth = require('./auth')
const app = express();


const secret = "ftvtLzywLJ2DInWS_d_1P9n-"


const database = {

}

module.exports = function(passport){

	passport.use(
		new TwitterStrategy({
    	consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL

    },

    function(accessToken, refreshToken, profile, cb){
    	console.log("HELLLLLLLLOOOOO")
    	// make the code asynchronous
    	// User.findOne won't fire until we have all our data back from Twitter
    	const user = database[accessToken] = {
            twitterId: profile.id,
            accessToken: accessToken
        };
		console.log("USER", user)

        return cb(null, user);

    	// process.nextTick(function(){

    	// 	User.findOne({'twitter.id' : profile.id}, function(err, user){
    	// 		// if there is an error, stop everything and return that
     //            // ie an error connecting to the database
     //            if (err)
     //                return done(err);

     //            if(user){
     //            	return done(null, user)
     //            }else{
     //            	const newUser = new User();

     //            	//set all data we need from schema
     //            	newUser.twitter.id          = profile.id;
     //                newUser.twitter.token       = token;
     //                newUser.twitter.username    = profile.username;
     //                newUser.twitter.displayName = profile.displayName;

     //            	newUser.save(function(err){
     //            		if(err)
     //            			throw err

     //            		return done(null, newUser)
     //            	})

     //            }
    	// 	})
    	// })

    }))

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









 
}
