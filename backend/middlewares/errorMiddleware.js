const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
     // return res.status(401).json({
     //      message : "Internal Server Error",
     //      success : false,
     // })
     let error = {...err}
     if (err) {
          error.message = err.message;
     } else {
          console.error('Error object is undefined:', err);
     }

     if(error.name === 'CastError'){
          const message = 'Resources not found'
          error = new ErrorResponse(message, 404)
     }

     if(error.code === 11000){
          const message = 'Duplicate field value entered'
          error = new ErrorResponse(message, 400)
     }

     if(error.name === 'ValdationError'){
          const message = Object.values(err.errors).map(val => val.message)
          error = new ErrorResponse(message, 400)
          res.status(error.statusCode || 500).json({
               success: false,
               error: error.message || 'Server error'
          })
     }

     
}

module.exports = errorHandler