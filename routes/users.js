var URL = require('url'); //获取url参数 依赖于url模块 使用前需要使用require
var User = require('./user');
var mysql = require('mysql');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/getUserInfo', function (req, res, next) {

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '050511',
        database : 'whyyy',
    });

    var user = new User();
    var params = URL.parse(req.url, true).query;
    if (!params.id) {
        params.id = 1;
    }
    var response;
    connection.connect();
    connection.query('SELECT * from y_users where id = ' + params.id, function (error, results, fields) {
        if (error) throw error;
        if (!!results && results.length > 0) {
            console.log('The solution is: ', results[0].name);
            user.name = results[0].name;
            user.gender = results[0].gender;
            user.age = results[0].age;
            user.id = params.id;
            console.log('The solution is: ', user.id);
            response = {status: 1, data: user};
            res.send(JSON.stringify(response));
        }
        else {
            response = {status: 0, data: {}};
            res.send(JSON.stringify(response));
        }
    });
    connection.end();

});

module.exports = router;
