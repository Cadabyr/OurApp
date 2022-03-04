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
    },
    profilePictureType: {
        type: String
    }
})

userSchema.virtual('profilePicturePath').get(function(){
    if(this.profilePicture != null && this.profilePictureType != null){
        return `data:${this.profilePictureType};charset=utf-8;base64,
        ${this.profilePicture.toString('base64')}`
    }
})

userSchema.plugin(passportLocalMongoose, {usernameField : 'email'})

module.exports = mongoose.model('User', userSchema)