var mysql = require('mysql'),
    credentials = require('../credentials');

var connection = mysql.createConnection({
        host     : credentials.dbProviders.host,
        user     : credentials.dbProviders.user,
        password : credentials.dbProviders.pwd,
        database : credentials.dbProviders.db,
    });

module.exports = connection;