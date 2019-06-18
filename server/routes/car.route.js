//  Module Imports
const router = require('express').Router();
const verify = require('../middleware/verify_token.middleware');
const { getAll, markCarAsSold, postCar, updatePost, viewCar, deleteCar } = require('../controllers/car.controller');
const validate = require('../middleware/veridate.middleware');

router.get('/car', validate, getAll);
router.get('/car/:id', viewCar);
router.delete('/car/:id', verify, deleteCar);
router.post('/car', validate, verify, postCar);
router.patch('/car/:id/price', verify, updatePost);
router.patch('/car/:id/status', verify, markCarAsSold);

module.exports = router;