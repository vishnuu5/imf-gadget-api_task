// Format success response
export const successResponse = (res, data, statusCode = 200, message = "Success") => {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    })
  }
  
  // Format error response
  export const errorResponse = (res, message = "Error", statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message,
    })
  }
  
  