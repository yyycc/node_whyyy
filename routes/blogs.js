let express = require('express');
let router = express.Router();
let userHandle = require('../modules/handle');
let Blog = require('../modules/Blog/blog');
let tableName = 'y_blogs';
let sql = require('../modules/sql');
let sqlValue = {};
sql(tableName, {id: 'blog_id'}, sqlValue);

/* GET blog listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * /blog/queryById
 * 根据ID查询博客
 * 获取拼接在url上的id
 */
router.get('/queryById', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    if (!obj.searchParams.get('id')) {
        res.send('请在url中拼接查询id');
        return false;
    }
    userHandle.queryById(req, res, next, sqlValue.queryById);
});

/**
 * /blog/query
 * 根据条件查询博客
 * 获取拼接在url上查询条件
 */
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
// 查询所有博客
/**
 * /blog/queryAll
 * 查询所有博客
 */
router.get('/queryAll', function (req, res, next) {
    userHandle.queryAll(req, res, next, sqlValue.queryAll);
});

/**
 * /blog/deleteById
 * 根据ID删除博客
 * 获取拼接在url上的ID
 */
router.get('/deleteById', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    if (!obj.searchParams.get('id')) {
        res.send('请在url中拼接id');
        return false;
    }
    userHandle.deleteById(req, res, next, sqlValue.deleteById);
});

/**
 * /blog/deleteByIds
 * 根据IDs删除博客
 * 获取拼接在url上的IDs
 */
router.get('/deleteByIds', function (req, res, next) {
    let obj = new URL(req.url, 'http://localhost:8880/');
    if (!obj.searchParams.get('ids')) {
        res.send('请在url中拼接ids');
        return false;
    }
    userHandle.deleteByIds(req, res, next, sqlValue.deleteByIds);
});

/* GET blog listing. */


/* POST blog listing. */

/**
 *  /blog/insert
 *  新增博客
 *  根据传入的对象插值，如果是null，就插入null，不会使用数据库字段默认值
 */
router.post('/insert', function (req, res, next) {
    // 新建表对象
    let user = new Blog(req.body);
    req.body = user;
    sql(tableName, {data: user}, sqlValue);
    userHandle.insert(req, res, next, sqlValue.insert);
});

/**
 *  /blog/insertSelective
 *  新增博客
 *  根据传入的对象插值，如果是null，就使用数据库字段默认值
 */
router.post('/insertSelective', function (req, res, next) {
    sql(tableName, {data: req.body}, sqlValue);
    userHandle.insert(req, res, next, sqlValue.insert);
});

/**
 *  /blog/batchInsert
 *  批量新增博客
 *  根据传入的对象插值，如果是null，就插入null，不会使用数据库字段默认值
 */
router.post('/batchInsertSelective', function (req, res, next) {
    sql(tableName, {data: req.body}, sqlValue);
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        data.push(Object.values(req.body[i]));
    }
    req.body = data;
    userHandle.batchInsert(req, res, next, sqlValue.batchInsert);
});

/**
 *  /blog/batchInsertSelective
 *  批量新增博客
 *  根据传入的对象插值，如果是null，就使用数据库字段默认值
 */
router.post('/batchInsert', function (req, res, next) {
    // 新建表对象
    let user;
    let data = [];
    for (let i = 0; i < req.body.length; i++) {
        user = new Blog(req.body[i]);
        data.push(Object.values(user));
    }
    req.body = data;
    sql(tableName, {data: new Blog(req.body[0])}, sqlValue);
    userHandle.batchInsert(req, res, next, sqlValue.batchInsert);
});

/**
 *  /blog/updateById
 *  根据ID更新博客数据
 */
router.post('/updateById', function (req, res, next) {
    sql(tableName, {data: req.body}, sqlValue);
    userHandle.updateById(req, res, next, sqlValue.updateById);
});

/**
 *  /blog/batchUpdate
 *  批量更新(增、删、改)
 */
router.post('/batchUpdate', function (req, res, next) {
    for (let i = 0; i < req.body.length; i++) {
        sql(tableName, {id: 'blog_id', data: req.body[i]}, sqlValue);
        if (req.body[i]._status === 'ADD') {
            req.body[i].sql = sqlValue.insert;
        }
        if (req.body[i]._status === 'UPDATE') {
            req.body[i].sql = sqlValue.updateById;
        }
        if (req.body[i]._status === 'DELETE') {
            req.body[i].sql = sqlValue.deleteById;
        }
    }
    userHandle.batchUpdate(req, res, next);
});
/* POST blog listing. */

module.exports = router;
