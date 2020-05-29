let express = require('express');
let router = express.Router();
let blogHandle = require('../modules/handle');
let posts = require('../modules/Blog/posts');
let sql = require('../modules/Blog/sql');

// 删除all
router.get('/del', function (req, res, next) {
    blogHandle.deleteAll(req, res, next);
});

router.get('/test', function (req, res, next) {
    blogHandle.batchInsertTest(req, res, next);
});

// 插入all
router.get('/', function (req, res, next) {
    let blogs = [];
    for (let i = 0; i < posts.length; i++) {
        let blog = [];
        let post = posts[i];
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

// 根据ID查询blog
router.get('/queryById', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    if (!obj.searchParams.get('id')) {
        res.send('请在url中拼接查询id');
        return false;
    }
    blogHandle.queryById(req, res, next, sql.queryById);
});

// 查询 all
router.get('/queryAll', function (req, res, next) {
    blogHandle.queryAll(req, res, next, sql.queryAll);
});

// 根据条件查询blog
router.get('/query', function (req, res, next) {
    console.log(req.url);
    let obj = new URL(req.url, 'http://localhost:8880/');
    let params = obj.searchParams;
    let keys = [];
    let query = sql.query;
    console.log(obj.searchParams);
    params.forEach((value, name) => {
        keys.push(name);
        if (query.indexOf('where') > -1) {
            query += ' and ' + name + '=?';
        } else if (name === 'blog_title') {
            query += ' where ' + name + ' like ?';
        } else {
            query += ' where ' + name + '=?';
        }
    });
    console.log(query);
    blogHandle.query(req, res, next, query);
});

module.exports = router;
