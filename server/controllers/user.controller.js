const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, usersData } = require('../models/user.model'); //  Import User Model and Data
const { registerValidation, loginValidation } = require('../middleware/validation.middleware'); //  Import Validations
const uuid = require('uuid/v1');
const { Database } = require('../db/auto_mart.db');

const db = new Database();

signIn = async (req, res) => {
    //  Validate
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({'status' : 404,'error' : error.details[0].message})
    const userData = {
        'email': req.body.email,
        'password': req.body.password
    };
    //  Check if user exist
    const user = usersData.find(u => u.email == userData.email);
    if (user) {
        //  Is password correct?
        const validPassword = await bcrypt.compare(userData.password, user.password);
        if (!validPassword) return res.send('Password is not correct.');
        //  Token
        const token = jwt.sign({email: user.email}, 'secret_key');
        res.header('authtoken', token).send({
            'status': 200,
            'message': 'User sign in is sucessfuly!',
            'user_token': token,
            'data': user
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
        req.body.email,
        req.body.first_name,
        req.body.last_name,
        hashedPassword,
        req.body.address,
        req.body.is_admin
    );

    db.createUserTable();
    let result;

    try {
        await db.addUser(user);
        
        result = await db.selectById('users', user.id);

    } catch (error) {
        res.status(404).send({
            'status': 404,
            'message': error.error
        });
        return;
    }

    res.send({
        'status': 200,
        'message': 'User registered sucessfuly!',
        'data': result.rows[0]
    });
    return;
};

module.exports.signIn = signIn;
module.exports.signUp = signUp;