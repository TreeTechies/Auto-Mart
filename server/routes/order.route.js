//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { makeOrder, updateOrder } = require('../controllers/order.controller');
const validate = require('../middleware/veridate.middleware');

router.post('/order', validate, verify, makeOrder);
router.patch('/order/:id', validate, verify, updateOrder);

module.exports = router;