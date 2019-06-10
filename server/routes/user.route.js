//  Module Imports
const router = require('express').Router();
const { signUp, signIn, getAll } = require('../controllers/user.controller');

router.post('/signup', signUp);

router.post('/signin', signIn);

router.post('/users', getAll);

module.exports = router;
