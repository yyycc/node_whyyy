let express = require('express');
let router = express.Router();
let userHandle = require('../modules/handle');
let User = require('../modules/User/user');

let sql = require('../modules/sql');
let sqlValue = {};
sql('y_users', {id: 'id'}, sqlValue);
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 根据ID查询用户
router.get('/queryById', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    if (!obj.searchParams.get('id')) {
        res.send('请在url中拼接查询id');
        return false;
    }
    userHandle.queryById(req, res, next, sqlValue.queryById);
});

// 根据条件查询用户
router.get('/query', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    let params = obj.searchParams;
    let keys = [];
    let query = sqlValue.query;
    params.forEach((value, name) => {
        keys.push(name);
        if (query.indexOf('where') > -1) {
            query += ' and ' + name + '=?';
        } else {
            query += ' where ' + name + '=?';
        }
    });
    userHandle.query(req, res, next, query);
});

// 查询所有用户
router.get('/queryAll', function (req, res, next) {
    userHandle.queryAll(req, res, next, sqlValue.queryAll);
});

// 根据ID删除用户
router.get('/deleteById', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    if (!obj.searchParams.get('id')) {
        res.send('请在url中拼接id');
        return false;
    }
    userHandle.deleteById(req, res, next, sqlValue.deleteById);
});

// 根据ID删除用户
router.get('/deleteByIds', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    if (!obj.searchParams.get('ids')) {
        res.send('请在url中拼接ids');
        return false;
    }
    userHandle.deleteByIds(req, res, next, sqlValue.deleteByIds);
});

/* GET users listing. */


/* POST users listing. */
/**
 *  /users/insertSelective
 *  新增用户
 *  根据传入的对象插值，如果是null，就使用数据库字段默认值
 */
router.post('/insertSelective', function (req, res, next) {
    sql('y_users', {data: req.body}, sqlValue);
    userHandle.insert(req, res, next, sqlValue.insert);
});

/**
 *  /users/insert
 *  新增用户
 *  根据传入的对象插值，如果是null，就插入null，不会使用数据库字段默认值
 */
router.post('/insert', function (req, res, next) {
    // 新建表对象
    let user = new User(req.body);
    req.body = user;
    sql('y_users', {data: user}, sqlValue);
    userHandle.insert(req, res, next, sqlValue.insert);
});

/**
 *  /users/batchInsert
 *  批量新增用户
 *  根据传入的对象插值，如果是null，就插入null，不会使用数据库字段默认值
 */
router.post('/batchInsertSelective', function (req, res, next) {
    sql('y_users', {data: req.body}, sqlValue);
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        data.push(Object.values(req.body[i]));
    }
    req.body = data;
    userHandle.batchInsert(req, res, next, sqlValue.batchInsert);
});

/**
 *  /users/batchInsertSelective
 *  批量新增用户
 *  根据传入的对象插值，如果是null，就使用数据库字段默认值
 */
router.post('/batchInsert', function (req, res, next) {
    // 新建表对象
    let user;
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        user = new User(req.body[i]);
        data.push(Object.values(user));
    }
    req.body = data;
    sql('y_users', {data: new User(req.body[0])}, sqlValue);
    userHandle.batchInsert(req, res, next, sqlValue.batchInsert);
});

router.post('/batchUpdate', function (req, res, next) {
    if (!req.body) {
        res.send('参数为空');
        return false;
    }
    userHandle.batchUpdate(req, res, next);
});
/* POST users listing. */

module.exports = router;
