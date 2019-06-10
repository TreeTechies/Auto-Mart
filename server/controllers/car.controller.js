const { carsData } = require('../models/car.model'); //  Import User Model and Data


getAll = (req, res) => {
    var availableCars = carsData.find((c) => c.status === "available");
    res.send({
        'status' : 200,
        'data' :  availableCars && availableCars.length > 0 ? availableCars : 'No cars available.'        
    });
};

postCar = (req, res) => {
    var car = {
        'id' : req.body.id,
        'owner' : req.body.owner,
        'created_on' : Date.now(),
        'state' : req.body.state,
        'status' : req.body.status,
        'price' : req.body.price,
        'manufacturer' : req.body.manufacturer,
        'model' : req.body.model,
        'body_type' : req.body.body_type,
    }

    carsData.push(car);

    res.send({
        'status': 200,
        'message': 'Car post sucessfuly added',
        'data': carsData[carsData.length -1]
    })
};

buyCar = (req, res) => {

};

updatePost = (req, res) => {

};

buyCar = (req, res) => {

};

viewCar = (req, res) => {
    var id = req.params.id;
    res.send({
        'status': 200,
        'data': carsData.find((c) => c.id === id)[0]
    });
};

markCarAsSold = (req, res) => {

};

module.exports.getAll = getAll;
module.exports.postCar = postCar;
module.exports.buyCar = buyCar;
module.exports.updatePost = updatePost;
module.exports.markCarAsSold = markCarAsSold;
module.exports.viewCar = viewCar;