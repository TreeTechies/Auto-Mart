const Joi = require('@hapi/joi');
const Schemas = require('./validation.middleware');

module.exports = (req, res, next) => {
    // enabled HTTP methods for request data validation
    const _supportedMethods = ['post', 'put', 'patch'];
    const route = req.route.path;
    const method = req.method.toLowerCase();

    if (_supportedMethods.includes(method) && Schemas[route] != undefined) {
        // get schema for the current route
        const schema = Schemas[route];
        if (schema) {
            // Validate req.body using the schema and validation options
            return Joi.validate(req.body, schema, (error, data) => {
                if (error) {
                    return res.status(400).send({'status' : 404,'error' : error.details[0].message});
                } else {
                    // Replace req.body with the data after Joi validation
                    req.body = data;
                    next();
                }
            });
        }
    }
    next();
};