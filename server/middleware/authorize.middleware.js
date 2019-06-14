
const verifyToken = require('./verify_token.middleware');

authorize = (roles = []) => {
    return [
        verifyToken(),

        (req, res, next) => {
            if (roles.length && !roles.include(req.user.role)) {
                res.status(401).send({
                    'status': 401,
                    'message': 'Unauthorized'
                });
            }

            next();
        }
    ];
};

module.exports = authorize;