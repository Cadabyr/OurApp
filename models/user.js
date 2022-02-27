const e = require('express')
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    profilePicture: {
        type: Buffer
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField : 'email'})

module.exports = mongoose.model('User', userSchema)