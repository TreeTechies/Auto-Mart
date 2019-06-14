//  Import Modules
const express = require('express');
//  Import Routes
const user_route = require('./routes/user.route');
const car_route = require('./routes/car.route');
const order_route = require('./routes/order.route');
const swagger = require('../swagger');

const app = express();

swagger(app);

const PORT = process.env.PORT || 3000;


//  Middlewares
app.use(express.json()); //  Json Middleware
app.use('/api/v1/auth', user_route);
app.use('/api/v1/car', car_route);
app.use('/api/v1/order', order_route);

const server = app.listen(PORT, ()=>{
    console.log(`running on port ${PORT}`)
});

module.exports = server;