const uuid = require('uuid/v1');

class Car {
    constructor(owner, state, price, manufacturer, model, body_type) {
        this.id = uuid();
        this.owner = owner;
        this.created_on = Date.now();
        this.state = state;
        this.status = 'available';
        this.price = price;
        this.manufacturer = manufacturer;
        this.model = model;
        this.body_type = body_type;
    }

    static create() {
        
    }
}

let carsData = [
    new Car(
        'c9b41b30-8dbd-11e9-aa65-25b7702cccc1',
        'new',
        45500,
        'Tesla',
        'Roadstar',
        'BB'
    )
];

module.exports.Car = Car;
module.exports.carsData = carsData;

