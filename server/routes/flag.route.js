const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const validate = require('../middleware/veridate.middleware');
const { postFlag } = require('../controllers/flag.controller')

router.post('/flag', verify, validate, postFlag);

module.exports = router;