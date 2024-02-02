const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
     try {
          await mongoose.connect(process.env.MONGO_URI)
          console.log('Connected to Database'.bgGreen.white)
     } catch (err) {
          console.log(`MongoDB error ${err}`.bgRed.white)
     }
}

module.exports = connectDB