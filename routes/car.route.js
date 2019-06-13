//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { getAll, markCarAsSold, postCar, updatePost, viewCar, deleteCar } = require('../controllers/car.controller');

router.get('/', getAll);
router.get('/:id', viewCar);
router.delete('/:id', verify, deleteCar);
router.post('/postCar', verify, postCar);
router.patch('/updatePost/:id', verify, updatePost);
router.patch('/markCarAsSold/:id', verify, markCarAsSold);

module.exports = router;