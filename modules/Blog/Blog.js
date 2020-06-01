function Blog(user) {
    this.id = user.id;
    this.title = user.title;
    this.date = user.date;
    this.last_updated_date = user.last_updated_date;
    this.tag = user.tag;
    this.summary = user.summary;
    this.recommended = user.recommended;
    this.route = user.route;
}

module.exports = Blog;


