const uuid = require('uuid/v1');

class Order {
    constructor(buyer, car_id, amount, status, price_offered) {
        this.id = uuid();
        this.buyer = buyer;
        this.car_id = car_id;
        this.amount = amount;
        this.status = status;
        this.price_offered = price_offered;
    }
}

module.exports.Order = Order;