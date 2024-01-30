const errorHandler = require('../middlewares/errorMiddleware.js')
const userModel = require('../models/userModel.js')
const ErrorResponse = require('../utils/errorResponse.js')
const jwt = require('jsonwebtoken')

//token creation
const sendToken = (user, statusCode, res) => {
     const token = user.getSignedToken()

     const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIREIN })
     res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 7000, httpOnly: true })

     res.status(statusCode).json({
          success: true,
          token,
          user
     })
}

const registerController = async (req, res, next) => {
     try {
          const { username, email, password } = req.body;

          const existingEmail = await userModel.findOne({ email });
          if (existingEmail) {
               return next(new ErrorResponse('Email is already in use', 500))
          }

          const user = await userModel.create({ username, email, password })
     } catch (error) {
          console.log(error);
          next(error)
     }
}

const loginController = async (req, res, next) => {
     try {
          const { email, password } = req.body;

          if (!email || !password) {
               return next(new ErrorResponse('Please provide email or password'))
          }

          const user = await userModel.findOne({ email });
          if (!user) {
               return next(new ErrorResponse('Invalid credentials', 401))
          }

          const isMatch = await user.matchPassword(password)
          if (!isMatch) {
               return next(new errorHandler('Invalid credentials', 401))
          }

          sendToken(user, 200, res);
     } catch (error) {
          console.log(error);
     }
}

const logoutController = async (req, res) => {
     res.clearCookie('refreshToken')
     return res.status(200).json({
          success: true,
          message: 'Logout successfully',
     })
}

const verifyController = async (req, res, next) => {
     try {
          const token = req.headers.authorization;

          const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

          return res.status(201).json({
               success: true,
               message: 'Already Logged In'
          })

     } catch (error) {
          console.log(error.message)
          next();
     }
}

module.exports = {
     registerController,
     loginController,
     logoutController,
     sendToken,
     verifyController
}