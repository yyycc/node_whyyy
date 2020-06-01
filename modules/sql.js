//sql.js
// SQL语句封裝
/*var user = {
    insert: 'INSERT INTO y_users(name, gender, password, role, mail_address, phone_number, age, creation_date) VALUES(?,?,?,?,?,?,?,?)',
    batchInsert: 'INSERT INTO y_users(name, gender, password, role, mail_address, phone_number, age, creation_date) VALUES ?',
    updatePassword: 'UPDATE y_users SET password=? WHERE id=?',
    deleteById: 'DELETE FROM y_users WHERE id=?',
    deleteAll: 'DELETE FROM y_users',
    deleteByIds: 'DELETE FROM y_users where id in (?)',
    queryById: 'SELECT * FROM y_users WHERE id=?',
    queryAll: 'SELECT * FROM y_users',
    query: 'SELECT * FROM y_users',
    update: 'update y_users set `name`=?, gender=?, password=?, role=?, mail_address=?, phone_number=?, age=?, creation_date=? WHERE id=?',
};*/

// insertSelective()
let user = function (tableName, tableObject, sql) {
    sql.queryAll = 'SELECT * FROM ' + tableName;
    sql.queryById = 'SELECT * FROM ' + tableName + ' WHERE ' + tableObject.id + '=?';
    sql.query = 'SELECT * FROM ' + tableName;

    sql.deleteAll = 'DELETE FROM ' + tableName;
    sql.deleteById = 'DELETE FROM ' + tableName + ' WHERE ' + tableObject.id + '=?';
    sql.deleteByIds = 'DELETE FROM ' + tableName + ' WHERE ' + tableObject.id + ' in (?)';

    // 根据传入对象的字段数目动态拼接sql
    let tableColumns, values = [], updateColumns = [];
    if (!!tableObject.data && !(tableObject.data instanceof Array)) {
        // data是对象的时候
        tableColumns = Object.keys(tableObject.data);
        for (let i = 0; i < tableColumns.length; i++) {
            values.push('?');
            if (tableColumns[i] !== '_status' && tableColumns[i] !== 'id') {
                updateColumns.push(tableColumns[i] + '=?');
            }
        }
    } else if (!!(tableObject.data instanceof Array) && tableObject.data.length > 0) {
        // data是数组的时候
        tableColumns = Object.keys(tableObject.data[0]);
        for (let i = 0; i < tableColumns.length; i++) {
            if (tableColumns[i] !== '_status' && tableColumns[i] !== 'id') {
                updateColumns.push(tableColumns[i] + '=?');
            }
        }
    }
    sql.insert = 'INSERT INTO y_users(' + tableColumns + ') VALUES(' + values.join(',') + ')';
    sql.batchInsert = 'INSERT INTO y_users(' + tableColumns + ') VALUES ?';


    sql.updateById = 'UPDATE ' + tableName + ' set ' + updateColumns.join(',') + ' where id=?';
};


module.exports = user;
