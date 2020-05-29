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
let mysqlConfig = require('../../config/mysql');
// 引入连接池配置
let poolExtend = require('../poolextent');
// 引入SQL模块
let sql = require('./sql');
// 引入json模块
let json = require('../json');
// 使用连接池，提升性能
let pool = mysql.createPool(poolExtend({}, mysqlConfig));

let userData = {
    batchInsert: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.batchInsert, [req.body], function (err, result) {
                if (result) {
                    result = 'add'
                }
                // 以json形式，把操作结果返回给前台页面
                json(res, result);
                // 释放连接
                connection.release();
            });
        });
    },
    batchUpdate: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            let result = 'batchUpdate';
            for (let i = 0; i < req.body.length; i++) {
                var status = req.body[i]._status;
                delete req.body[i]._status;
                if (status === 'ADD') {
                    connection.query(sql.insert, [...Object.values(req.body[i])], function (err, result) {
                        console.log(err);
                        if (err) {
                            result = undefined
                        }
                    });
                } else if (status === 'UPDATE') {
                    let id = req.body[i].id;
                    delete req.body[i].id;
                    connection.query(sql.update, [...Object.values(req.body[i]), +id],
                        function (err, result) {
                            if (err) {
                                result = undefined
                            }
                        });
                } else if (status === 'DELETE') {
                    let id = req.body[i].id;
                    connection.query(sql.delete, id, function (err, result) {
                        if (err) {
                            result = undefined
                        }
                    });
                }
            }
            json(res, result);
            connection.release();
        })
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
                if (!!result && result !== '') {
                    let _result = result;
                    result = {
                        result: 'select',
                        data: _result[0] //id查询必然匹配到<=1条数据
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryByName: function (req, res, next) {
        let name = '' + req.query.name;
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryByName, name, function (err, result) {
                if (!!result && result !== '') {
                    let _result = result;
                    result = {
                        result: 'select',
                        data: _result[0] //id查询必然匹配到<=1条数据
                    }
                } else {
                    result = undefined;
                    err = err;
                }
                json(res, result, err);
                connection.release();
            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query(sql.queryAll, function (err, result) {
                if (!!result && result !== '') {
                    let _result = result;
                    result = {
                        result: 'selectAll',
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