class User{
    constructor(id, email, first_name, last_name, password, address, is_admin) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.address = address;
        this.is_admin = is_admin;
    }
}

//  Array of Users
let usersData = [];

module.exports.User = User;
module.exports.usersData = usersData;