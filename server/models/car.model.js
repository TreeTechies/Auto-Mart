const uuid = require('uuid/v1');

class Car {
    constructor(owner, state, price, manufacturer, model, body_type) {
        this.id = uuid();
        this.owner = owner;
        this.state = state;
        this.status = 'available';
        this.price = price;
        this.manufacturer = manufacturer;
        this.model = model;
        this.body_type = body_type;
    }
}

module.exports.Car = Car;