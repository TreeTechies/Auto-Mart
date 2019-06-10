//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { getAll, buyCar, markCarAsSold, postCar, updatePost, viewCar } = require('../controllers/car.controller');

router.get('/', verify, getAll);
router.post('/postCar', verify, postCar);
router.get('/buyCar/:id', verify, buyCar);
router.patch('/updatePost', verify, updatePost);
router.patch('/markCarAsSold', verify, markCarAsSold);
router.get('/viewCar/:id', verify, viewCar);

module.exports = router;