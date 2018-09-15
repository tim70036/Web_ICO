
function userContext(req) {
    return { user : {name : req.user.name, id : req.user.id, email : req.user.email} };
}

module.exports = function(app, options) {

    var userLayout ={layout: options.layout}; 

    return {

        registerRoutes : function() {
            
            // dashboard page
            app.get('/userpanel/dashboard', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
    
                 // Get user data from Passport
                 let user = userContext(req);

                 // Collect all dynamic data for view
                 let context = { ...user };
 
                 // Render 
                 res.render('dashboard',  { ...userLayout, ...context } );
            });
            // kyc page
            app.get('/userpanel/kyc', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
    
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('kyc',  { ...userLayout, ...context } );
    
            });
            // kyc-application page
            app.get('/userpanel/kyc-application', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
    
                 // Get user data from Passport
                 let user = userContext(req);

                 // Collect all dynamic data for view
                 let context = { ...user };
 
                 // Render 
                 res.render('kyc-application',  { ...userLayout, ...context } );
    
                
            });
            // tokens page
            app.get('/userpanel/tokens', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
    
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('tokens',  { ...userLayout, ...context } );
    
                
            });
            // transactions page
            app.get('/userpanel/transactions', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
    
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('transactions',  { ...userLayout, ...context } );
    
            });
            // referrals page
            app.get('/userpanel/referrals', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('referrals',  { ...userLayout, ...context } );
    
                
            });
            // account page
            app.get('/userpanel/account', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
                
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('account',  { ...userLayout, ...context } );
    
                
            });
            // security page
            app.get('/userpanel/security', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
                
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('security',  { ...userLayout, ...context } );
    
                
            });
            // activity page
            app.get('/userpanel/activity', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
                
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('activity',  { ...userLayout, ...context } );
    
                
            });
            // howto page
            app.get('/userpanel/howto', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
                
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('howto',  { ...userLayout, ...context } );
    
                
            });
            // faq page
            app.get('/userpanel/faq', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('faq',  { ...userLayout, ...context } );
    
                
            });
            // policy page
            app.get('/userpanel/policy', function(req, res) {
                if(!req.isAuthenticated()) {
                    console.log("not authorized");
                    console.log(req.cookies);
                    res.redirect(303, "/login");
                    return;
                }
                
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('policy',  { ...userLayout, ...context } );
                
            });
        },
    };
    
};