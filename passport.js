var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(config, UserProfile){
    passport.use(new GoogleStrategy(
        {
            authorizationURL: config.google.authorizationURL,
            tokenURL: config.google.tokenURL,
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.origin + config.google.callback
        },
        function(accessToken, refreshToken, profile, done){
            UserProfile.findOne({id: profile.id}, function(err, user){
                if (err) throw err;
                if (!user) {
                    profile.provider = "Google";
                    user = new UserProfile(profile);
                    user.save(function(err, user){
                        if (err) throw err;
                        done(err, user);
                    });
                }
                else {
                    done(err, user);
                }
            });
        }
    ));

    passport.use(new TwitterStrategy(
        {
            consumerKey: config.twitter.consumerKey,
            consumerSecret: config.twitter.consumerSecret,
            callbackURL: config.origin + config.twitter.callback
        },
        function(token, tokenSecret, profile, done) {
            UserProfile.findOne({id: profile.id}, function(err, user){
                if (err) throw err;
                if (!user) {
                    profile.provider = "Twitter";
                    user = new UserProfile(profile);
                    user.save(function(err, user){
                        if (err) throw err;
                        done(err, user);
                    });
                }
                else {
                    done(err, user);
                }
            });
        }
    ));

    passport.use(new FacebookStrategy(
        {
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.origin + config.facebook.callback
        },
        function(accessToken, refreshToken, profile, done) {
            UserProfile.findOne({id: profile.id}, function(err, user){
                if (err) throw err;
                if (!user) {
                    profile.provider = "Facebook";
                    user = new UserProfile(profile);
                    user.save(function(err, user){
                        if (err) throw err;
                        done(err, user);
                    });
                }
                else {
                    done(err, user);
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        UserProfile.findOne({id: id}, function(err, user){
            done(null, user);
        });
    });

    return passport;
}
