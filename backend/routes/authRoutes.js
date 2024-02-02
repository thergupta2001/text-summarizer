const express = require("express");
const {
  registerController,
  loginController,
  logoutController,
} = require("../controllers/authController.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/verify", (req, res) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return res.status(201).json({
      success: true,
      message: "Already Logged In",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;