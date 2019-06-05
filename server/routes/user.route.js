//  Module Imports
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Users } = require('../models/user.model'); //  Import User Model and Data
const { registerValidation, loginValidation } = require('../middleware/validation.middleware'); //  Import Validations


router.post('/signup', async (req,res) => {

    //  Validate
    const { error } = registerValidation(req.body);

    if (error) return res.status(400).send({'status' : 404,'error' : error.details[0].message});

    //  Check if user exist
    if (Users.filter(u => u.email == req.body.email).length > 0) return res.send(`User with this email(${user.email}) exist.`);
    
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

    const lastUsersLength = Users.length;
    Users.push(user);

    if (lastUsersLength < Users.length) {
        res.send({
            'Message': 'User saved secussfuly!',
            'New user': Users[Users.length - 1]
        });
    } else {
        res.send('Failed to save user.');
    }

});

router.post('/signin', async (req,res) => {

    //  Validate
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).send({'status' : 404,'error' : error.details[0].message})

    const userData = {
        'email': req.body.email,
        'password': req.body.password
    };

    //  Check if user exist
    let user;

    const availableUsers = Users.filter(u => u.email == userData.email);

    if (availableUsers.length > 0) {
        user = availableUsers[0];

        //  Is password correct?
        const validPassword = await bcrypt.compare(userData.password, user.password);

        if (!validPassword) return res.send('Password is not correct.');

        //  Token
        const token = jwt.sign({_id: user._id}, 'kkkkkjsjsiijs');
        res.header('authtoken', token).send(token);
    }
    else{
        return res.send(`Email(${userData.email}) doesn't exist!`);
    }

});

module.exports = router;
