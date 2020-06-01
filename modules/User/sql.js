//sql.js
// SQL语句封裝
var user = {
    updatePassword: 'UPDATE y_users SET password=? WHERE id=?',
    update: 'update y_users set `name`=?, gender=?, password=?, role=?, mail_address=?, phone_number=?, age=?, creation_date=? WHERE id=?',
};

module.exports = user;
