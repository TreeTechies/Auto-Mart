const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model'); //  Import User Model and Data
const { Database } = require('../helpers/db/auto_mart.db');

const db = new Database();

signIn = async (req, res) => {
    //  Check if user exist
    const result = await db.selectBy('users', 'email', req.body.email);
    if (result.rowCount > 0) {
        const validPassword = await bcrypt.compare(req.body.password, result.rows[0].password);
        if (!validPassword) return res.send('Password is not correct.');
        const token = jwt.sign({email: req.body.email}, 'secret_key');
        return res.header('authtoken', token).send({ 'status': 200, 'message': 'User sign in is sucessfuly!', 'user_token': token, 'data': result.rows[0] });
    }
    
    return res.status(401).send(`Email with this ${req.body.email} doesn't exist!`);
};
 
signUp = async (req, res) => {
    //  Check if user exist
    const result = await db.selectCount('users', 'email', req.body.email);
    
    if (result.rows[0].count === '0') {
        //  Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User( req.body.email, req.body.first_name, req.body.last_name, hashedPassword, req.body.address, req.body.is_admin );
        let result;
        try {
            result = await db.addUser(user);
            res.send({ 'status': 200, 'message': 'User registered sucessfuly!', 'data': result.rows[0] });
        } catch (error) {
            res.status(404).send({ 'status': 404, 'message': error.error }); return;
        }
    }
    else{
        res.status(404).send({ 'status': 404, 'message': `User with this email exist.` }); return;
    }

    return;
};

module.exports.signIn = signIn;
module.exports.signUp = signUp;