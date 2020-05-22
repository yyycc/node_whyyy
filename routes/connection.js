var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '050511',
    database : 'whyyy',
});

module.exports = connection;


