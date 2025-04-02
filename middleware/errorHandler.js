const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
  
    // Default error object
    const error = {
      success: false,
      message: err.message || "Server Error",
      status: err.statusCode || 500,
    }
  
    // Sequelize unique constraint error
    if (err.name === "SequelizeUniqueConstraintError") {
      error.message = "Duplicate field value entered"
      error.status = 400
    }
  
    // Sequelize validation error
    if (err.name === "SequelizeValidationError") {
      error.message = Object.values(err.errors)
        .map((val) => val.message)
        .join(", ")
      error.status = 400
    }
  
    // JWT errors
    if (err.name === "JsonWebTokenError") {
      error.message = "Invalid token"
      error.status = 401
    }
  
    if (err.name === "TokenExpiredError") {
      error.message = "Token expired"
      error.status = 401
    }
  
    res.status(error.status).json({
      success: error.success,
      message: error.message,
    })
  }
  
  export default errorHandler
  
  