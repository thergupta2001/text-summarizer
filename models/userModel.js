const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const userSchema = new mongoose.Schema({
     username: {
          type: String,
          required: [true, 'Username is required']
     },
     email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true
     },
     password: {
          type: String,
          required: [true, 'Password is required'],
          minlength: [6, 'Password should be atleast 6 characters long']
     },
     customerId: {
          type: String,
          default: ""
     },
     subscription: {
          type: String,
          default: ""
     }
})

userSchema.pre('save', async function (next) {
     //update
     if (!this.isModified("password")) {
          return next()
     }

     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt)
     next()
});

userSchema.methods.matchPassword = async function (password) {
     return await bcrypt.compare(password, this.password)
}

userSchema.methods.getSignedToken = function () { //inside res was there
     const accessToken = jwt.sign({ id: this._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE })
     // const refreshToken = jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, { expiresIn: process.env.JWT_REFRESH_EXPIREIN })
     // res.cookie('refreshToken', `${refreshToken}`, { maxAge: 86400 * 7000, httpOnly: true })
     return accessToken
}

const User = mongoose.model('User', userSchema)

module.exports = User