// To overwrite default express error handler

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message, //error has a message associated with it
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    // if in production mode we want more info on error
  });
};

module.exports = {
  errorHandler,
};
