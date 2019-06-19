//  Module Imports
const router = require('express').Router();
const { signUp, signIn } = require('../controllers/user.controller');
const validate = require('../middleware/veridate.middleware')

router.post('/auth/signup', validate, signUp);

router.post('/auth/signin', validate, signIn);

module.exports = router;