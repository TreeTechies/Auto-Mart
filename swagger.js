const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  info: {
    title: 'AutoMart',
    version: '1.0.0',
    description: 'Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.',
  },
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/routes/user.route.js`, `${__dirname}/routes/car.route.js`, `${__dirname}/routes/order.route.js`],
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = (app) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};