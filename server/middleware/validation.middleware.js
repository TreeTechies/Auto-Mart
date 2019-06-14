//  Imports
const Joi = require('@hapi/joi'); //  Import Joi for Validations

//  Register validation
function registerValidation(data) {
    const userSchema = {
        email:      Joi.string().required().email(),
        first_name: Joi.string().required(),
        last_name:  Joi.string().required(),
        password:   Joi.string().min(6).required(),
        address:    Joi.string().required(),
        is_admin:   Joi.boolean().required(),
    };

    return Joi.validate(data, userSchema);
}

//  Login validation
function loginValidation(data) {
    const schema = {
        email:      Joi.string().required().email(),
        password:   Joi.string().min(6).required()
    };

    return Joi.validate(data, schema);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;