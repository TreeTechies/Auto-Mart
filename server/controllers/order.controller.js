const { carsData } = require('../models/car.model');
const { Order } = require('../models/order.model');
const { Database } = require('../helpers/db/auto_mart.db');

const db = new Database();

makeOrder = async (req, res) => {
    var car_id = req.body.id;
    var user_email = req.user.email;
 
    const car = await db.selectById('cars', car_id);

    if (car.rowCount == 0) return res.status(401).send({ 'status': 401, 'message': `Car with id of ${car_id} not found` });
    //  Get user
    const user = await db.selectBy('users', 'email', user_email);
    if (user.rowCount === 0) return res.status(401).send({ 'status': 401, 'message': `Your are not signed in, try again later.` });
    
    // Make order
    var order = new Order( user.rows[0].id, car_id, car.rows[0].price, 'pending', car.rows[0].price );

    const result = await db.addOrder(order);

    if (result.rowCount > 0) return res.status(200).send({ 'status': 200, 'message': 'Purchase order was done sucessfuly.', 'data': result.rows[0] });

    return res.status(401).send({ 'status': 401, 'message': 'Purchase order was not inserted.' });
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