const jwt = require('jsonwebtoken');

const getToken = (authorization) => {
    // Authorization:Bearer [JWT TOKEN]
    return authorization && authorization.startsWith('Bearer ')
        ? authorization.split('Bearer ')[1]
        : null
}

const verifyToken = (token, callback) => jwt.verify(token, process.env.JWT_SECRET, callback);

module.exports = (req, res, next) => {
    const token = getToken(req.headers.authorization)

    return verifyToken(token, (err, decoded) => {
        if(err){
            err.status = token ? 403 : 401;
            return next(err);
        }

        return next();
    })
}