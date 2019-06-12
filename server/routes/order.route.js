//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { makeOrder } = require('../controllers/order.controller');

router.post('/', verify, makeOrder);

module.exports = router;