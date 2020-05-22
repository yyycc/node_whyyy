//sql.js
// SQL语句封裝
var user = {
    insert: 'INSERT INTO y_blogs(blog_id, blog_title, blog_date, blog_updated_date, blog_tags, blog_description, blog_is_recommended, blog_route) VALUES(?,?,?,?,?,?,?,?)',
    batchInsert: 'INSERT INTO y_blogs(blog_id, blog_title, blog_date, blog_updated_date, blog_tags, blog_description, blog_is_recommended, blog_route) VALUES ?',
    updateDate: 'UPDATE y_blogs SET blog_updated_date=? WHERE id=?',
    delete: 'DELETE FROM y_blogs WHERE id=?',
    deleteAll: 'DELETE FROM y_blogs',
    queryById: 'SELECT * FROM y_blogs WHERE id=?',
    queryAll: 'SELECT * FROM y_blogs',
    queryAllBlogs: 'SELECT  blog_id `key` ,blog_title title, blog_date `date`, blog_tags tag, blog_description summary, blog_is_recommended recommended, blog_route route FROM y_blogs;',
    insertUser: 'INSERT INTO y_users(name, gender) values ?'
};

module.exports = user;
