module.exports = function(app, config, passport) {
    // Redirect the user to Google for authentication.
    app.get('/auth/google',
        passport.authenticate('google', { scope: config.google.scope })
    );

    // Google will redirect the user to this URL after authentication.
    app.get(config.google.callback,
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    // Redirect the user to Twitter for authentication.
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // Twitter will redirect the user to this URL after approval.
    app.get(config.twitter.callback,
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    // Redirect the user to Facebook for authentication.
    app.get('/auth/facebook', passport.authenticate('facebook'));

    // Facebook will redirect the user to this URL after approval.
    app.get(config.facebook.callback,
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );
}
