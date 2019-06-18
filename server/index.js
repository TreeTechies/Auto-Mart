//  Import Modules
const express = require('express');
//  Import Routes
const user_route = require('./routes/user.route');
const car_route = require('./routes/car.route');
const order_route = require('./routes/order.route');
const swagger = require('../swagger');
const { Database } = require('./helpers/db/auto_mart.db');

const app = express();

swagger(app);

const PORT = process.env.PORT || 3000;


//  Middlewares
app.use(express.json()); //  Json Middleware
app.use('/api/v1', user_route);
app.use('/api/v1', car_route);
app.use('/api/v1', order_route);

const db = new Database();
db.createDb();

const server = app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
});

module.exports = server;