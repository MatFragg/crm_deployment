const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    // Authorization header
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    // Get the token and verify it
    const token = authHeader.split(' ')[1]; // Bearer token
    let checkToken;
    try {
        checkToken = jwt.verify(token,'SECRETKEY');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    // If the token is valid, but there is an error
    if(!checkToken) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }

    req.user = checkToken;
    next();
}