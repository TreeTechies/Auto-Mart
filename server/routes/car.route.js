//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { getAll, buyCar, markCarAsSold, postCar, updateOrder, updatePost, viewCar } = require('../controllers/car.controller');

router.get('/', verify, getAll);
router.get('/postCar', verify, postCar);
router.get('/buyCar/:id', verify, buyCar);
router.get('/updateOrder', verify, updateOrder);

router.get('/updatePost', verify, updatePost);
router.get('/markCarAsSold', verify, markCarAsSold);
router.get('/viewCar/:id', verify, viewCar);

module.exports = router;