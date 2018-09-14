// Load the things we need
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var credentials = require('./credentials');

/////////////////////////////
// Only for test
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('./ssl/ico.pem', 'utf8');
var certificate = fs.readFileSync('./ssl/ico.crt', 'utf8');
var ssl = { key: privateKey, cert: certificate };
/////////////////////////////

var app = express();




// Set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//app.enable('view cache');

// Set middleware 
app.use(express.static(__dirname + '/public')); // for static content
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set authentication 
var auth = require('./lib/auth.js')(app, {
    successRedirect: '/', 
    failureRedirect: '/',
});

// Links in Passport middleware
auth.init();

// Set authentication routes
auth.registerRoutes();


// Set render page routes
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