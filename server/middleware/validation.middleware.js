//  Imports
const Joi = require('@hapi/joi');

const signupSchema = {
    email:      Joi.string().strict().trim().min(3).required().email(),
    first_name: Joi.string().strict().trim().min(3).required(),
    last_name:  Joi.string().strict().trim().min(3).required(),
    password:   Joi.string().strict().trim().min(6).required(),
    address:    Joi.string().strict().trim().min(3).required()
}

const signinSchema = {
    email:      Joi.string().strict().trim().min(3).required().email(),
    password:   Joi.string().strict().trim().min(6).required()
};

const postCarSchema = {
    state:          Joi.string().strict().trim().min(3).required(),
    price:          Joi.number().integer().min(1).required(),
    manufacturer:   Joi.string().strict().trim().min(3).required(),
    model:          Joi.string().strict().trim().min(3).required(),
    body_type:      Joi.string().strict().trim().min(1).required()
};

const orderSchema = {
    id: Joi.number().min(1).required()
};

const flagSchema = {
    car_id: Joi.number().min(1).required(),
    reason: Joi.string().strict().trim().min(1).required(),
    description: Joi.string().strict().trim().min(1).required()
};

const updateCarPriceSchema = {
    price: Joi.number().integer().min(1).required(),
};

const updateOrderPriceSchema = {
    price: Joi.number().integer().min(1).required(),
};

// export the schemasc
module.exports = {
    '/auth/signup': signupSchema,
    '/auth/signin': signinSchema,
    '/car': postCarSchema,
    '/car/:id/price': updateCarPriceSchema,
    '/order': orderSchema,
    '/order/:id': updateOrderPriceSchema,
    '/flag': flagSchema,
};