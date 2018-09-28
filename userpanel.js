
// Produce user data for templating
function userContext(req) {
    return { user : {name : req.user.name, id : req.user.id, email : req.user.email} };
}

// Function for checking each request
function authorize(req, res, next) {
    // User not login, just redirect
    if(!req.isAuthenticated()) {
        console.log("not authorized");
        res.redirect(303, "/login");
        return;
    }

    // User has logined, moving forward
    return next();
}

module.exports = function(app, options) {

    var userLayout ={layout: options.layout}; 

    return {

        registerRoutes : function() {
            
            // dashboard page
            app.get('/userpanel/dashboard', authorize, function(req, res) {

                 // Get user data from Passport
                 let user = userContext(req);

                 // Collect all dynamic data for view
                 let context = { ...user };
 
                 // Render 
                 res.render('dashboard',  { ...userLayout, ...context } );
            });
            // kyc page
            app.get('/userpanel/kyc', authorize, function(req, res) {
    
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('kyc',  { ...userLayout, ...context } );
    
            });
            // kyc-application page
            app.get('/userpanel/kyc-application', authorize, function(req, res) {
    
                 // Get user data from Passport
                 let user = userContext(req);

                 // Collect all dynamic data for view
                 let context = { ...user };
 
                 // Render 
                 res.render('kyc-application',  { ...userLayout, ...context } );
    
                
            });
            // tokens page
            app.get('/userpanel/tokens', authorize, function(req, res) {

                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('tokens',  { ...userLayout, ...context } );
    
                
            });
            // transactions page
            app.get('/userpanel/transactions', authorize, function(req, res) {

                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('transactions',  { ...userLayout, ...context } );
    
            });
            // referrals page
            app.get('/userpanel/referrals', authorize, function(req, res) {
                
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('referrals',  { ...userLayout, ...context } );
    
                
            });
            // account page
            app.get('/userpanel/account', authorize, function(req, res) {
               
                 // Get user data from Passport
                 let user = userContext(req);

                 // Collect all dynamic data for view
                 let context = { ...user };
 
                 if(req.query.tab){
                     var tab = {tab: req.query.tab};
                     var page = {...tab};
                     res.render('account',  { ...userLayout, ...context, ...page } );
                 }else{
                     res.render('account',  { ...userLayout, ...context} );
                 }    
    
                
            });
            // security page
            app.get('/userpanel/security', authorize, function(req, res) {
     
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('security',  { ...userLayout, ...context } );
    
                
            });
            // activity page
            app.get('/userpanel/activity', authorize, function(req, res) {
       
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('activity',  { ...userLayout, ...context } );
    
                
            });
            // howto page
            app.get('/userpanel/howto', authorize, function(req, res) {

                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('howto',  { ...userLayout, ...context } );
    
                
            });
            // faq page
            app.get('/userpanel/faq', authorize, function(req, res) {
             
                // Get user data from Passport
                let user = userContext(req);

                // Collect all dynamic data for view
                let context = { ...user };

                // Render 
                res.render('faq',  { ...userLayout, ...context } );
    
                
            });
            // policy page
            app.get('/userpanel/policy', authorize, function(req, res) {
          
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