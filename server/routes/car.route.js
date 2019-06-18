//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { getAll, markCarAsSold, postCar, updatePost, viewCar, deleteCar } = require('../controllers/car.controller');

router.get('/', getAll);
router.get('/:id', viewCar);
router.delete('/:id', verify, deleteCar);
router.post('/', verify, postCar);
router.patch('/:id/price', verify, updatePost);
router.patch('/:id/status', verify, markCarAsSold);

module.exports = router;