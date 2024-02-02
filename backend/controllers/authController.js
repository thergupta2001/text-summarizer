// const errorHandler = require("../middlewares/errorMiddleware.js");
const userModel = require("../models/userModel.js");
// const ErrorResponse = require("../utils/errorResponse.js");
const jwt = require("jsonwebtoken");

//token creation
const sendToken = (user, statusCode, res) => {
  try {
    const token = user.getSignedToken();

    const refreshToken = jwt.sign(
      { id: this._id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: process.env.JWT_REFRESH_EXPIREIN }
    );

    return res.status(statusCode).json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.json({ message: "Email already in use" });
    }

    await userModel.create({ username, email, password });
    return res.status(200).send({
      message: "user created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // console.log(email, password);
    if (!email || !password) {
      return res.json({ message: "Invalid credentials" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.json({ message: "Invalid credentials" });
    }

    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  sendToken,
};
