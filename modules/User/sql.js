//sql.js
// SQL语句封裝
var user = {
    insert: 'INSERT INTO y_users(name, gender, password, role, mail_address, phone_number, age, creation_date) VALUES(?,?,?,?,?,?,?,?)',
    updatePassword: 'UPDATE y_users SET password=? WHERE id=?',
    delete: 'DELETE FROM y_users WHERE id=?',
    deleteAll: 'DELETE FROM y_users',
    queryById: 'SELECT * FROM y_users WHERE id=?',
    queryByName: 'SELECT * FROM y_users WHERE `name`=?',
    queryAll: 'SELECT * FROM y_users',
};

module.exports = user;
