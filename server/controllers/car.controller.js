const jwt = require('jsonwebtoken');
const { Car } = require('../models/car.model');
const { Database } = require('../helpers/db/auto_mart.db');

const db = new Database();

getAll = async (req, res) => {
    var min_price = req.query.min;
    var max_price = req.query.max;
    
    if(min_price && max_price) {
        var query_min_max = await db.selectCarByPriceRange(min_price, max_price);
        res.status(200).send({
            'status' : 200,
            'message': query_min_max.rows.length > 0 ? `Cars with price range is between ${min_price} and ${max_price}` : `No cars withprice range is between ${min_price} and ${max_price}.`,
            'data' :  query_min_max.rows
        });
    }
    else if (min_price) {
        var query_min_max = await db.selectCarByMinPrice(min_price);
        res.status(200).send({
            'status' : 200,
            'message': query_min_max.rows.length > 0 ? `Cars with price range is above ${min_price}` : `No cars with price above ${min_price}.`,
            'data' :  query_min_max.rows
        });
    }
    else if(max_price) {
        var query_min_max = await db.selectCarByMaxPrice(max_price);
        res.status(200).send({
            'status' : 200,
            'message': query_min_max.rows.length > 0 ? `Cars with price range is below ${max_price}` : `No cars with price below ${max_price}.`,
            'data' :  query_min_max.rows
        });
    }
    else {
        const token = req.header('auth-token');
        if (token) {
            const verified = jwt.verify(token, 'secret_key'); // Verify provided user token if is still loged in
            const is_admin = await db.selectBy('users', 'email', verified.email);
            if (is_admin.rows[0].isadmin) {
                var carsResult = await db.selectAll('cars');
                return res.status(200).send({ 'status': 200, 'message': 'All cars sold and unsold', 'data': carsResult.rows })
            };
        }
        // Get all cars whose status is available
        var carsResult = await db.selectBy('cars', 'status', 'available');
        return res.status(200).send({
            'status' : 200,
            'data' :  carsResult.rows,
            'message': carsResult.rowCount > 0 ? 'Available cars' : 'No cars available.'   
        });
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

updatePost = async (req, res) => {
    var id = req.params.id;
    var new_price = req.body.price;
    
    const user = await db.selectBy('users', 'email', req.user.email);
    
    const result = await db.updateCarPrice({'price': new_price, 'id': id, 'owner': user.rows[0].id});
    
    if (result.rowCount > 0) {
        return res.status(200).send({ 'status': 200, 'message': 'Car price was updated sucessfuly.', 'data': result.rows });
    }
    else{
        return res.status(200).send({ 'status': 200, 'message': 'Car id is not exist' });
    }
};

viewCar = async (req, res) => {
    var id = req.params.id;
    const car = await db.selectBy('cars', 'id', id);
    res.status(200).send({
        'status': 200,
        'data': car.rows[0],
        'message': car.rowCount != 0 ? `Car of ${car.rows[0].id}` : `No car with a provided id of ${car.rows[0].id}`
    });
};

markCarAsSold = async (req, res) => {
    var id = req.params.id;
    var status = req.body.status;
    
    const user = await db.selectBy('users', 'email', req.user.email);
    
    const result = await db.updateCarStatus({'status': status, 'id': id, 'owner': user.rows[0].id});
    
    if (result.rowCount > 0) {
        return res.status(200).send({ 'status': 200, 'message': 'Car status was updated sucessfuly.', 'data': result.rows });
    }
    else{
        return res.status(200).send({ 'status': 200, 'message': 'Car id is not exist' });
    }
};

deleteCar = async (req, res) => {  
    //  Get user role
    const user = await db.selectBy('users', 'email', req.user.email);
    if (user.rowCount == 0 || !user.rows[0].isadmin) {
        return res.status(401).send({ 'status': 401, 'message': 'Unauthorized request' });
    }

    var id = req.params.id;
    await db.deleteCar(id);

    return res.status(200).send({
        'status': 200,
        'message': 'Car Ad successfully deleted'
    });
};

module.exports.getAll = getAll;
module.exports.postCar = postCar;
module.exports.updatePost = updatePost;
module.exports.markCarAsSold = markCarAsSold;
module.exports.viewCar = viewCar;
module.exports.deleteCar = deleteCar;