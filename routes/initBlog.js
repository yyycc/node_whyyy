var express = require('express');
var router = express.Router();
var blogHandle = require('../modules/handle');
var json = require('./json');

// 删除all
router.get('/del', function (req, res, next) {

    blogHandle.deleteAll(req, res, next);
});

router.get('/test', function (req, res, next) {
    blogHandle.batchInsertTest(req, res, next);
});

// 插入all
router.get('/', function (req, res, next) {
    var blogs = [];
    for (let i = 0; i < json['posts'].length; i++) {
        var blog = [];
        var post = json['posts'][i];
        blog.push(post['key']);
        blog.push(post['title']);
        blog.push(post['date']);
        blog.push(post['date']);
        blog.push(post['tag'].join(','));
        blog.push(post['summary']);
        blog.push((post['recommended'] || false) ? 'Y' : 'N');
        blog.push(post['route']);
        blogs.push(blog);
    }
    req.data = blogs;
    blogHandle.batchInsert(req, res, next);
});

// 查询 all
router.get('/queryAll', function (req, res, next) {
    blogHandle.queryAllBlogs(req, res, next);
});

module.exports = router;
