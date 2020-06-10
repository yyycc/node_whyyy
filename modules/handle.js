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
let poolExtend = require('./poolExtent');
// 引入SQL模块
let sql = require('./User/sql');
// 引入json模块
let json = require('./json');
// 使用连接池，提升性能
let pool = mysql.createPool(poolExtend({}, mysqlConfig));

let changeResult = function(err, result, res) {
    let data = {}, success;
    if (result) {
        success = true;
        data.affectedRows = result.affectedRows;
    } else if (err) {
        success = false;
        data.code = err.code;
        data.sqlMessage = err.sqlMessage;
        data.sql = err.sql;
    }
    json(res, success, data);
};

let queryResult = function(err, result, res) {
    let data = {}, success;
    if (result) {
        success = true;
        data = result;
    } else if (err) {
        success = false;
        data.code = err.code;
        data.sqlMessage = err.sqlMessage;
        data.sql = err.sql;
    }
    json(res, success, data);
};

let userData = {
    // 新增
    insert: function (req, res, next, sql) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, [...Object.values(req.body)], function (err, result) {
                changeResult(err, result, res);
                // 释放连接
                connection.release();
            });
        });
    },
    // 新增多条
    batchInsert: function (req, res, next, sql) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, [req.body], function (err, result) {
                changeResult(err, result, res);
                // 释放连接
                connection.release();
            });
        });
    },
    // 批量更新(增、删、改)
    batchUpdate: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            let result = 'batchUpdate';
            let msg = '更新成功';
            for (let i = 0; i < req.body.length; i++) {
                let status = req.body[i]._status;
                let sql = req.body[i].sql;
                delete req.body[i]._status;
                delete req.body[i].sql;
                if (status === 'ADD') {
                    connection.query(sql, [...Object.values(req.body[i])],
                        function (err, result) {
                            if (err) {
                                msg = err;
                            }
                        });
                } else if (status === 'UPDATE') {
                    let id = req.body[i].id;
                    delete req.body[i].id;
                    connection.query(sql, [...Object.values(req.body[i]), +id],
                        function (err, result) {
                            if (err) {
                                msg = err;
                            }
                        });
                } else if (status === 'DELETE') {
                    let id = req.body[i].id;
                    if (!id) {
                        continue;
                    }
                    connection.query(sql, id, function (err, result) {
                        if (err) {
                            msg = err;
                        }
                    });
                }
            }
            json(res, result, msg);
            connection.release();
        })
    },

    // 根据多个ID删除
    deleteByIds: function (req, res, next, sql) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, [req.query.ids.split(',')], function (err, result) {
                let affected;
                if (!err && result.affectedRows === 0) {
                    result = 'delete';
                    affected = '根据ID未查询到数据';
                } else if (result.affectedRows !== req.query.ids.split(',').length) {
                    affected = '删除' + result.affectedRows + '条数据';
                    result = 'delete';
                } else if (result.affectedRows > 0) {
                    result = 'delete';
                    affected = '删除成功';
                } else {
                    result = undefined;
                }
                json(res, result, affected);
                connection.release();
            });
        });
    },

    // 根据ID删除
    deleteById: function (req, res, next, sql) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, req.query.id, function (err, result) {
                let affected;
                if (!err && result.affectedRows === 0) {
                    result = 'delete';
                    affected = '根据ID未查询到数据';
                } else if (result.affectedRows > 0) {
                    result = 'delete';
                    affected = '删除成功';
                } else {
                    result = undefined;
                    affected = err;
                }
                json(res, result, affected);
                connection.release();
            });
        });
    },
    // 根据ID查询
    queryById: function (req, res, next, sql) {
        let id = +req.query.id;
        pool.getConnection(function (err, connection) {
            connection.query(sql, id, function (err, result) {
                queryResult(err, result, res);
                connection.release();
            });
        });
    },
    //根据条件查询
    query: function (req, res, next, sql) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, [...Object.values(req.query)], function (err, result) {
                queryResult(err, result, res);
                connection.release();
            });
        });
    },
    // 查询全部
    queryAll: function (req, res, next, sql) {
        pool.getConnection(function (err, connection) {
            connection.query(sql, function (err, result) {
                queryResult(err, result, res);
                connection.release();
            });
        });
    },
    // 根据ID更新
    updateById: function (req, res, next, sql) {
        let id = req.body.id;
        delete req.body.id;
        pool.getConnection(function (err, connection) {
            connection.query(sql, [...Object.values(req.body), +id], function (err, result) {
                let affected;
                if (!err && result.affectedRows === 0) {
                    result = 'update';
                    affected = '根据ID未查询到数据';
                } else if (result.affectedRows > 0) {
                    result = 'update';
                    affected = '更新成功';
                } else {
                    result = undefined;
                    affected = err;
                }
                json(res, result, affected);
                connection.release();
            });
        });
    },
    // 根据ID更新
    update: function (req, res, next) {
        let id = req.body[i].id;
        delete req.body[i].id;
        pool.getConnection(function (err, connection) {
            connection.query(sql.update, [...Object.values(req.body), +id], function (err, result) {
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
};
module.exports = userData;
