const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');

    if(!token) return res.status(401).send('Access denied!');

    try {
        const verified = jwt.verify(token, 'kkkkkjsjsiijs'); // Verify provided user token if is still loged in
        req.user = verified; // Store user token for leter use
        next(); // Let continue
    } catch (error) {
        res.status(400).send('Invalid token!');
    }
}