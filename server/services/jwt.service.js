const jwt = require("jsonwebtoken")

const createToken = (username, role) => {
    let payload = {
        username: username,
        role: role
    };

    let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY_MINUTES,
        issuer: process.env.JWT_ISS,
    });

    return token;
}

module.exports = createToken;