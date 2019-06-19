//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { makeOrder, updateOrder } = require('../controllers/order.controller');

router.post('/', verify, makeOrder);
router.patch('/:id', verify, updateOrder);

module.exports = router;