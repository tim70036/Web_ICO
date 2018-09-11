// Load the things we need
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

//app.enable('view cache');

// Set the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set static middleware 
app.use(express.static(__dirname + '/public'));

// Routing
// index page 
app.get('/', function(req, res) {
    res.render('index',  {layout: false} ); // not using layout
});

// login page
app.get('/login', function(req, res) {
    res.render('index',  {layout: false} ); // not using layout
});

app.listen(8080);
console.log('8080 is the magic port');