const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken")

const authenticate = (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }  
    if(!token) {
        next(new UnauthenticatedError("Token not found."));
    }
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            username: decoded.username,
            role: decoded.role
        };
        next();
    } catch (error) {
        next(new UnauthenticatedError("Invalid token."));
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if(!roles.contains(req.user.role)) {
            next(new UnauthorizedError("Access denied."));
        }
        next();
    }
}

module.exports = {
    authenticate,
    authorize
};