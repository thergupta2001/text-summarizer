const express = require('express')
const router = express.Router();
const { main, completions } = require('../controllers/openaiController')

router.post('/summary', main)
router.post('/completion', completions)

module.exports = router