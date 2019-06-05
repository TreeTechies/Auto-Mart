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
let users = [
    new User(1, 'nsengimanavedadom@gmail.com', 'Nsengimana', 'Veda Dominique', 'Veda123.', 'Gikondo', false)
];

module.exports.User = User;
module.exports.Users = users;