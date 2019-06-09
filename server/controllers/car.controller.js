const { carsData } = require('../models/car.model'); //  Import User Model and Data

getAll = (req, res) => {
    res.json({
        'status' : 200,
        'data' : carsData          
    });
};

postCar = (req, res) => {

};

buyCar = (req, res) => {

};

updatePost = (req, res) => {

};

postCar = (req, res) => {

};

buyCar = (req, res) => {

};

viewCar = (req, res) => {

};

module.exports.getAll = getAll;
module.exports.postCar = postCar;
module.exports.buyCar = buyCar;
module.exports.updateOrder = updateOrder;
module.exports.updatePost = updatePost;
module.exports.markCarAsSold = markCarAsSold;
module.exports.viewCar = viewCar;