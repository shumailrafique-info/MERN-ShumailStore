const ErrorHandler = require("../utils/errorhandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongodb id Error
  if (err.name === "CastError") {
    const message = `Resource Not Found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //Mongoose Dublicate Key Error

  if (err.code === 11000) {
    message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid, Try Again`;
    err = new ErrorHandler(message, 400);
  }
  //JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try Again`;
    err = new ErrorHandler(message, 400);
  }

  //JWT EXPIRE ERROR
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
