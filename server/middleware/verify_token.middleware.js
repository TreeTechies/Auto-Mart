const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    const role = req.header('role');

    if(!token) return res.status(401).send({
        'status': 401,
        'message': 'Please sign in first.'
    });

    try {
        const verified = jwt.verify(token, 'secret_key'); // Verify provided user token if is still loged in
        req.user = {
            'token': verified,
            'role': role
        }; // Store user token and role for leter use
        
        next(); // Let continue
    } catch (error) {
        res.status(400).send({
            'status': 401,
            'message': 'Invalid token!'
        });
    }
}