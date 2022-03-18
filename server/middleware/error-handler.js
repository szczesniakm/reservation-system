const { StatusCodes } = require("http-status-codes")

const errorHandler = (err, req, res, next) => {
    console.log(err);
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.statusCode ? err.message : "An unexpected error occured."
    };
    return res.status(customError.statusCode).json({ message: customError.message });
}

module.exports = { errorHandler };