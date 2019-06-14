const { carsData } = require('../models/car.model');
const { Order, orders } = require('../models/order.model');
const { usersData } = require('../models/user.model');
const { makeOrderV } = require('../middleware/validation.middleware');

makeOrder = (req, res) => {
    var car_id = req.body.id;
    var user_email = req.user.email;

    //  Validate
    const { error } = makeOrderV(user);

    if (error) {
        return res.status(400).send({'status' : 404,'error' : error.details[0].message});
    }

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

updateOrder = (req, res) => {
    var price_offered = req.body.price_offered;
    var order_id = req.params.id;
    var user_email = req.user.email;

    //  Get user
    const user = usersData.find(u => u.email == user_email);

    const order_index = orders.findIndex((o) => o.id === order_id);

    if(orders[order_index].buyer != user.id){
        res.status(401).send({
            'status': 401,
            'message': 'The purchase order your are trying to update is not yours.'
        });
        return;
    }

    const old_offered_price = orders[order_index].price_offered;
    
    // Update order
    orders[order_index].price_offered = price_offered;

    res.status(200).send({
        'status': 200,
        'data': {
            'id' : orders[order_index].id,
            'car_id' : orders[order_index].car_id,
            'status' : orders[order_index].status,
            'old_price_offered' : old_offered_price,
            'new_price_offered' : parseFloat(price_offered)
        }
    });
    return;
}

module.exports.makeOrder = makeOrder;
module.exports.updateOrder = updateOrder;