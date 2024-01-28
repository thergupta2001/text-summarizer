const express = require('express')
const router = express.Router();
const { main } = require('../controllers/openaiController')

router.post('/summary', main)

module.exports = router