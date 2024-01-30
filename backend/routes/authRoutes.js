const express = require('express')
const { registerController, loginController, logoutController, verifyController } = require('../controllers/authController.js')

const router = express.Router()

router.post('/register', registerController)
router.post('/login', verifyController, loginController)
router.post('/logout', logoutController)

module.exports = router