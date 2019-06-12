//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { getAll, markCarAsSold, postCar, updatePost, viewCar } = require('../controllers/car.controller');

router.get('/', verify, getAll);
router.post('/postCar', verify, postCar);
router.patch('/updatePost/:id', verify, updatePost);
router.patch('/markCarAsSold/:id', verify, markCarAsSold);
router.get('/viewCar/:id', viewCar);

module.exports = router;