const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, usersData } = require('../models/user.model'); //  Import User Model and Data
const { registerValidation, loginValidation } = require('../middleware/validation.middleware'); //  Import Validations

const secret_key = process.env.secret_key;

signIn = async (req, res) => {
    //  Validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({'status' : 404,'error' : error.details[0].message})
    const userData = {
        'email': req.body.email,
        'password': req.body.password
    };
    //  Check if user exist
    const availableUsers = usersData.filter(u => u.email == userData.email);
    if (availableUsers.length > 0) {
        const user = availableUsers[0];
        //  Is password correct?
        const validPassword = await bcrypt.compare(userData.password, user.password);
        if (!validPassword) return res.send('Password is not correct.');
        //  Token
        const token = jwt.sign({_id: user._id}, 'secret_key');
        res.header('authtoken', token).send({
            'status': 200,
            'message': 'User sign in is sucessfuly!',
            'user_token': token
        });
    }
    else{
        return res.send(`Email(${userData.email}) doesn't exist!`);
    }
};

signUp = async (req, res) => {
    //  Validate
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({'status' : 404,'error' : error.details[0].message});
    //  Check if user exist
    if (usersData.filter(u => u.email == req.body.email).length > 0) return res.send(`User with this email(${user.email}) exist.`);
    //  Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User(
        req.body.id,
        req.body.email,
        req.body.first_name,
        req.body.last_name,
        hashedPassword,
        req.body.address,
        req.body.is_admin
    );
    usersData.push(user);
    res.send({
        'status': 200,
        'message': 'User registered sucessfuly!',
        'user': usersData[usersData.length -1]
    });
};

getAll = (req, res) => {
    res.send({
        'status': req.status,
        'data': usersData
    });
};

module.exports.signIn = signIn;
module.exports.signUp = signUp;
module.exports.getAll = getAll;