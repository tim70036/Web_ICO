// Load the things we need
const   express = require('express'),
        exphbs  = require('express-handlebars'),
        bodyParser = require('body-parser'),
        credentials = require('./credentials'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        uuid = require('uuid/v4');


/////////////////////////////
// Only for test
const   fs = require('fs'),
        https = require('https'),
        privateKey  = fs.readFileSync('./ssl/ico.pem', 'utf8'),
        certificate = fs.readFileSync('./ssl/ico.crt', 'utf8'),
        ssl = { key: privateKey, cert: certificate };
/////////////////////////////

var app = express();

// Set middleware 
app.use(cookieParser());   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Static content 
app.use("/userpanel", express.static(__dirname + "/public/userpanel")); // for any url that start wih /userpanel (user panel page)
app.use(express.static(__dirname + '/public/main')); // for other page(main page)


app.use(session({
    genid: (req) => {
      console.log('Inside the session middleware');
      return uuid(); // use UUIDs for session IDs
    },
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }))



// Set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//app.enable('view cache');



// Set authentication 
const auth = require('./lib/auth.js')(app, {
    successRedirect: '/', 
    failureRedirect: '/',
});
auth.init();  // Links in Passport middleware
auth.registerRoutes(); // Set authentication routes

// Set userpanel pages
const userpanel = require('./userpanel.js')(app, {
    layout : 'userpanel',
});
userpanel.registerRoutes();


// Set index page routes
// index page 
app.get('/', function(req, res) {
    res.render('index',  {layout: false} ); // not using layout
});
// login page
app.get('/login', function(req, res) {
    res.render('login-light',  {layout: false} ); // not using layout
});
// signup page
app.get('/signup', function(req, res) {
    res.render('signup-light',  {layout: false} ); // not using layout
});






// Logout
app.get('/logout', function(req, res) {
    
    // Using only req.logout is not sufficient
    req.session.destroy((err) => {
        if(err) return next(err);
    
        req.logout();
    
        res.redirect(303, '/');
    });

});


// Set form handling routes
app.post('/signup', function(req, res) {
    console.log("receive shit");

    // Return to home page
    res.redirect(303, '/')
});



// app.listen(8080);
// console.log('8080 is the magic port');


/////////////////////////////
// Only for test
https.createServer(ssl, app).listen(8080);
console.log('Using https at 8080 port for development use...');
/////////////////////////////