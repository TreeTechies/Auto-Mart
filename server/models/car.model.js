class Car {
    constructor(id, owner, created_on, state, status, price, manufacturer, model) {
        this.id = id;
        this.owner = owner;
        this.created_on = created_on;
        this.state = state;
        this.status = status;
        this.price = price;
        this.manufacturer = manufacturer;
        this.model = model;
    }
}

let carsData = [];

module.exports.Car = Car;
module.exports.carsData = carsData;

