function User(user) {
    this.id = user.id;
    this.name = user.name;
    this.gender = user.gender;
    this.password = user.password;
    this.role = user.role;
    this.mail_address = user.mail_address;
    this.phone_number = user.phone_number;
    this.age = user.age;
    this.creation_date = user.creation_date;
}

module.exports = User;
