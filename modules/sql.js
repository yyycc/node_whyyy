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

var user = function(tableName, tableObject, sql) {
    sql.queryAll = 'SELECT * FROM ' + tableName;
    sql.queryById = 'SELECT * FROM ' + tableName + ' WHERE id=?';
    sql.query = 'SELECT * FROM ' + tableName;

    sql.deleteAll = 'DELETE FROM ' + tableName;
    sql.deleteById = 'DELETE FROM ' + tableName + ' WHERE id=?';
    sql.deleteByIds = 'DELETE FROM ' + tableName + ' WHERE id in (?)';
};



module.exports = user;
