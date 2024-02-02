const bodyParser = require('body-parser');
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv').config()

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))

app.get('/test',(req,res)=>{
     return res.status(200).json({
          message : "hi",
     })
})

app.listen(8080, () => {
     console.log(`Server on port 8080`)
})