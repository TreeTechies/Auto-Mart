//  Import Modules
const express = require('express');
//  Import Routes
const user_route = require('./routes/user.route');
const car_route = require('./routes/cars.route');

const app = express();
const PORT = process.env.PORT || 3000;


//  Middlewares
app.use(express.json()); //  Json Middleware
app.use('/api/v1/users', user_route);
app.use('/api/v1/cars', car_route);

const server = app.listen(PORT, () => console.log(`Server is runing on ${PORT}`));

module.exports = server;