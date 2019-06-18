//  Imports
const Joi = require('@hapi/joi');

const signupSchema = {
    email: Joi.string().required().email(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    password: Joi.string().min(6).required(),
    address: Joi.string().required(),
    is_admin: Joi.boolean().required(),
}

const signinSchema = {
    email:      Joi.string().required().email(),
    password:   Joi.string().min(6).required()
};

// export the schemas
module.exports = {
    '/signup': signupSchema,
    '/signin': signinSchema
};