//  Imports
const Joi = require('@hapi/joi');

const signupSchema = {
    email:      Joi.string().required().email(),
    first_name: Joi.string().required(),
    last_name:  Joi.string().required(),
    password:   Joi.string().min(6).required(),
    address:    Joi.string().required()
}

const signinSchema = {
    email:      Joi.string().required().email(),
    password:   Joi.string().min(6).required()
};

const postCarSchema = {
    state:          Joi.string().required(),
    price:          Joi.number().integer().required(),
    manufacturer:   Joi.string().required(),
    model:          Joi.string().required(),
    body_type:      Joi.string().required()
};

const orderSchema = {
    id: Joi.string().required()
};

const updateCarPriceSchema = {
    price: Joi.number().integer().required(),
};

const updateOrderPriceSchema = {
    price: Joi.number().integer().required(),
};

// export the schemasc
module.exports = {
    '/auth/signup': signupSchema,
    '/auth/signin': signinSchema,
    '/car': postCarSchema,
    '/car/:id/price': updateCarPriceSchema,
    '/order': orderSchema,
    '/order/:id': updateOrderPriceSchema,
};