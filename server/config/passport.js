const express = require('express');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

//load user model
const User = require('./models/user');

//load auth module
const configAuth = require('./auth')


module.exports = function(passport) {

    //serialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    //deserialize
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	passport.use(
		new TwitterStrategy({
        	consumerKey     : configAuth.twitterAuth.consumerKey,
            consumerSecret  : configAuth.twitterAuth.consumerSecret,
            callbackURL     : configAuth.twitterAuth.callbackURL
        },

        (accessToken, refreshToken, profile, done) => {
        	// make the code asynchronous
        	// User.findOne won't fire until we have all our data back from Twitter
        	process.nextTick(function() {

                User.findOne({'twitter.id' : profile.id}, function(err, user) {
                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if(err) {
                        return done(err);
                    }
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        const newUser = new User();
                        //set all data we need from schema
                        newUser.twitter.id          = profile.id;
                        newUser.twitter.accessToken = accessToken;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;
                        newUser.twitter.favorites   = [];

                        newUser.save(function(err) {
                            if(err) {
                                throw err
                            }
                            return done(null, newUser);
                        });
                    }
                });
            });
        })
    );


    passport.use(
        new BearerStrategy(
            function(accessToken, done) {
                User.findOne({'twitter.accessToken' : accessToken },
                    function(err, user) {
                        if(err) {
                            return done(err);
                        }
                        if(!user) {
                            return done(null, false);
                        }
                        return done(null, user, { scope: 'all' });
                    }
                );
            })
        );
    
};
