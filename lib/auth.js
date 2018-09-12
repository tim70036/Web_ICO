// Require all we need 
var passport = require('passport'), 
    FacebookStrategy = require('passport-facebook').Strategy;

// Mapping user between client <-> server <-> database
// Particulary, userid in session <-> user instance in database
passport.serializeUser(function(user, done){ 
    // done(null, user._id);
    done(null,user);
});

passport.deserializeUser(function(id, done){ 
    // User.findById(id, function(err, user){ 
    //     if(err || !user) 
    //         return done(err, null); 
    //     done(null, user);
    // }); 
    done(null,id);
});


// Export auth module with 2 functionality : init and register routes
module.exports = function(app, options){

    // if success and failure redirects aren't specified,
    // set some reasonable defaults 
    if(!options.successRedirect) options.successRedirect = '/';
    if(!options.failureRedirect) options.failureRedirect = '/login';
    
    return {
        
        // Function that is used to configure strategy for Passport
        init: function() {

            var config = options.providers;

            // Configure Facebook strategy
            passport.use(new FacebookStrategy({ 
                    clientID: config.facebook.appId, 
                    clientSecret: config.facebook.appSecret, 
                    callbackURL: '/auth/facebook/callback',
                }, function(accessToken, refreshToken, profile, done){
                    // We will get to this function if user finish FB authentication
                    var authId = 'facebook:' + profile.id;

                    console.log("We get user profile \n");
                    console.log(profile);

                    // Find or create user in database
                    
                    
                    
                    done(null, authId);
                    // if err , done(err, null)
            }));
            

            // Initialize Passport and restore authentication state, if any, from the session.
            app.use(passport.initialize());
            app.use(passport.session());
        }, 
        
        // Function that is used to register auth routes to express
        registerRoutes: function() {
            // Register Facebook auth routes
            app.get('/auth/facebook',  passport.authenticate('facebook'));

            // Register Facebook callback route
            app.get('/auth/facebook/callback', 
                passport.authenticate('facebook', {failureRedirect: options.failureRedirect }), 
                function(req, res){
                    // we only get here on successful authentication

                    res.redirect(303, options.successRedirect);
                },
            );
            
        },
    };
};