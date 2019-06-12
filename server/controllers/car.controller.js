const uuid = require('uuid/v1');

const { carsData } = require('../models/car.model');
const { usersData } = require('../models/user.model');

getAll = (req, res) => {
    var availableCars = carsData.filter((c) => c.status === "available");

    var min_price = req.query.min;
    var max_price = req.query.max;
    
    if (min_price || max_price) {
        if (min_price && max_price) {

            var query_min_max = carsData.filter((c) => c.price >= min_price && c.price <= max_price);

            res.status(200).send({
                'status' : 200,
                'message': query_min_max.length > 0 ? `Cars with price range is between ${min_price} and ${max_price}` : `No cars withprice range is between ${min_price} and ${max_price}.`,
                'data' :  query_min_max
            });
        }
        else if (min_price) {
            var query_min = carsData.filter((c) => c.price >= min_price);

            res.status(200).send({
                'status' : 200,
                'message': query_min.length > 0 ? `Cars with price range is above ${min_price}` : `No cars with price above ${min_price}.`,
                'data' :  query_min
            });
        }
        else if(max_price) {
            var query_max = carsData.filter((c) => c.price <= max_price);

            res.status(200).send({
                'status' : 200,
                'message': query_max.length > 0 ? `Cars with price range is below ${max_price}` : `No cars with price below ${max_price}.`,
                'data' :  query_max
            });
        }
    } else {
        if (availableCars.length === 0) {
            res.status(200).send({
                'status' : 200,
                'message' :  'No cars available.'        
            });
        }
    
        res.status(200).send({
            'status' : 200,
            'data' :  availableCars        
        });
    }
};

postCar = (req, res) => {
    
    var user_email = req.user.email
    
    //  Get user
    const user = usersData.find(u => u.email == user_email);

    if (!user) {
        res.status(401).send({
            'status': 401,
            'message': 'You don\'t have an account in our system, please create one.' 
        });
        return;
    }

    var car = {
        'id' : uuid(),
        'owner' : user.id,
        'created_on' : Date.now(),
        'state' : req.body.state,
        'status' : 'available',
        'price' : req.body.price,
        'manufacturer' : req.body.manufacturer,
        'model' : req.body.model,
        'body_type' : req.body.body_type,
    }

    carsData.push(car);

    res.status(200).send({
        'status': 200,
        'message': 'Car post sucessfuly added',
        'data': carsData[carsData.length -1]
    });
};

updatePost = (req, res) => {
    var id = req.params.id;
    var new_price = req.body.price;
    
    var car_index = carsData.findIndex((c) => c.id === id);
    carsData[car_index].price = new_price;

    res.status(200).send({
        'status': 200,
        'message': 'Car price is updated sucessfuly.',
        'data': carsData[car_index]
    });

};

viewCar = (req, res) => {
    var id = req.params.id;
    res.send({
        'status': 200,
        'data': carsData.find((c) => c.id === id)
    });
};

markCarAsSold = (req, res) => {
    var id = req.params.id;
    var status = req.body.status;
    
    var car_index = carsData.findIndex((c) => c.id === id);
    carsData[car_index].status = status;

    res.status(200).send({
        'status': 200,
        'message': 'Car status is updated sucessfuly.',
        'data': carsData[car_index]
    });
};

module.exports.getAll = getAll;
module.exports.postCar = postCar;
module.exports.updatePost = updatePost;
module.exports.markCarAsSold = markCarAsSold;
module.exports.viewCar = viewCar;