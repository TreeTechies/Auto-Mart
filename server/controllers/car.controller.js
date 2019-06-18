const jwt = require('jsonwebtoken');
const { Car } = require('../models/car.model');
const { Database } = require('../helpers/db/auto_mart.db');

const db = new Database();

getAll = (req, res) => {
    var min_price = req.query.min;
    var max_price = req.query.max;
    
    if (min_price || max_price) {
        // Get all cars whose status is available
        var availableCars = carsData.filter((c) => c.status === "available");
        
        if (min_price && max_price) {

            var query_min_max = availableCars.filter((c) => c.price >= min_price && c.price <= max_price);

            res.status(200).send({
                'status' : 200,
                'message': query_min_max.length > 0 ? `Cars with price range is between ${min_price} and ${max_price}` : `No cars withprice range is between ${min_price} and ${max_price}.`,
                'data' :  query_min_max
            });
        }
        else if (min_price) {
            var query_min = availableCars.filter((c) => c.price >= min_price);

            res.status(200).send({
                'status' : 200,
                'message': query_min.length > 0 ? `Cars with price range is above ${min_price}` : `No cars with price above ${min_price}.`,
                'data' :  query_min
            });
        }
        else if(max_price) {
            var query_max = availableCars.filter((c) => c.price <= max_price);

            res.status(200).send({
                'status' : 200,
                'message': query_max.length > 0 ? `Cars with price range is below ${max_price}` : `No cars with price below ${max_price}.`,
                'data' :  query_max
            });
        }
    } 
    else {
        const token = req.header('auth-token');

        if (token) {
            const verified = jwt.verify(token, 'secret_key'); // Verify provided user token if is still loged in
            const is_admin = usersData.find(u => u.email == verified.email).is_admin;

            if (is_admin) {
                res.status(200).send({
                    'status': 200,
                    'message': 'All cars sold and unsold',
                    'data': carsData
                });
                return;
            }
        }

        // Get all cars whose status is available
        var cars = carsData.filter((c) => c.status === "available");

        res.status(200).send({
            'status' : 200,
            'data' :  cars,
            'message': 'All available cars'    
        });
        
        return;
    }
};

postCar = async (req, res)  => {
    var user_email = req.user.email;
    //  Get user
    const result = await db.selectBy('users', 'email', user_email);
    if (result.rowCount === 0) return res.status(401).send({ 'status': 401, 'message': 'You don\'t have an account in our system, please create one.' });
    var car = new Car( result.rows[0].id, req.body.state, req.body.price, req.body.manufacturer, req.body.model, req.body.body_type);
    try {
        const insertedUser = await db.addCar(car);
        return res.status(200).send({ 'status': 200, 'message': 'Car post sucessfuly added', 'data': insertedUser.rows[0] });
    } catch (error) {
        return res.status(401).send({ 'status': 401, 'message': 'Car is not saved' });
    }

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
    var car = carsData.find((c) => c.id === id);
    res.status(200).send({
        'status': 200,
        'data': car,
        'message': car != undefined ? `Car with id of ${car.id}` : `No car with a provided id of ${car.id}`
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

deleteCar = (req, res) => {
    var user_email = req.user.email;    
    //  Get user role
    const is_admin = usersData.find(u => u.email == user_email).is_admin;

    if (!is_admin) {
        res.status(401).send({
            'status': 401,
            'message': 'Unauthorized request'
        });
        return;
    }

    var id = req.params.id;
    const deletedItems = carsData.splice(carsData.findIndex((c) => c.id === id), 1);
    res.status(200).send({
        'status': 200,
        'message': 'Car Ad successfully deleted',
        'data': deletedItems
    });
    return;
};

module.exports.getAll = getAll;
module.exports.postCar = postCar;
module.exports.updatePost = updatePost;
module.exports.markCarAsSold = markCarAsSold;
module.exports.viewCar = viewCar;
module.exports.deleteCar = deleteCar;