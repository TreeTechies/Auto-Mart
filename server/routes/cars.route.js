//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { User, Users } = require('../models/user.model'); //  Import User Model and Data
const { registerValidation, loginValidation } = require('../middleware/validation.middleware'); //  Import Validations

router.get('/', verify, (req, res) => {
    res.json([
        {
            'id': 1222,
            'model': 'Model001'
        }
    ]);
});

router.get('/postCar', verify, (req, res) => {
    res.send('Post a car');
});

router.get('/buyCar/:id', verify, (req, res) => { 
    res.send('Buy a car');
});

router.get('/updateOrder', verify, (req, res) => { 
    res.send('Update order');
});

router.get('/updatePost', verify, (req, res) => { 
    res.send('Update a post');
});

router.get('/markCarAsSold', verify, (req, res) => { 
    res.send('Mark a car as sold');
});

router.get('/viewCar/:id', verify, (req, res) => { 
    res.send('View a car');
});

module.exports = router;