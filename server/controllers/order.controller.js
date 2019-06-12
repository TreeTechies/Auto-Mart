const { carsData } = require('../models/car.model');
const { Order, orders } = require('../models/order.model');
const { usersData } = require('../models/user.model');

makeOrder = (req, res) => {
    var car_id = req.body.id;
    var user_email = req.user.email;

    const car = carsData.find((c) => c.id === car_id);

    if (!car) {
        res.status(401).send({
            'status': 401,
            'message': `Car with id of ${car_id} not found`
        });
        return;
    }

    //  Get user
    const user = usersData.find(u => u.email == user_email);
    
    if (!user) {
        res.status(401).send({
            'status': 401,
            'message': 'You don\'t have an account in our system, please create one.'
        });
        return;
    }

    // Make order
    var order = new Order(
        user.id,
        car_id,
        car.price,
        'pending',
        car.price
    );

    orders.push(order);

    res.status(200).send({
        'status': 200,
        'message': 'Purchase order was done sucessfuly.',
        'data': orders[orders.length - 1]
    });
}

module.exports.makeOrder = makeOrder;