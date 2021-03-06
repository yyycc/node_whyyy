//handel.js
/*
    数据增删改查模块封装
    req.query 解析GET请求中的参数 包含在路由中每个查询字符串参数属性的对象，如果没有则为{}
    req.params 包含映射到指定的路线“参数”属性的对象,如果有route/user/：name，那么“name”属性可作为req.params.name
    req.body通常用来解析POST请求中的数据
     +req.query.id 可以将id转为整数
 */
// 引入mysql
let mysql = require('mysql');
// 引入mysql连接配置
let mysqlConfig = require('../config/mysql');
// 引入连接池配置
let poolExtend = require('./poolextent');
// 引入SQL模块
let sql = require('./sql');
// 引入json模块
let json = require('./json');
// 使用连接池，提升性能
let pool = mysql.createPool(poolExtend({}, mysqlConfig));

let userData = {
    insert: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.insert, [...req.data], function (err, result) {
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                console.log(sql.insert);
                json(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    batchInsertTest: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            var param = [['xiaohong', 'F'], ['xiaolan', 'M']];
            connection.query(sql.insertUser, [param], function (err, result) {
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                console.log('err:' + err);
                json(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    batchInsert: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.batchInsert, [req.data], function (err, result) {
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                console.log('err:' + err);
                json(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    deleteAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.deleteAll, null, function (err, result) {
                if (result && result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            let id = +req.query.id;
            connection.query(sql.delete, id, function (err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        let param = req.body;
        if (param.name == null || param.age == null || param.id == null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function (err, connection) {
            connection.query(sql.update, [param.name, param.age, +param.id], function (err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryById: function (req, res, next) {
        let id = +req.query.id;
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryById, id, function (err, result) {
                if (result != '') {
                    let _result = result;
                    result = {
                        result: 'select',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAllBlogs: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryAllBlogs, function (err, result) {
                if (result != '') {
                    let _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
};
module.exports = userData;
