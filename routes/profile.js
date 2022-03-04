const express = require('express')
const router = express.Router()
const User = require('../models/user')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

router.get('/', async (req, res) => {
    try{
        res.render('profile/show', {user: req.user})
    } catch{
        res.redirect('/login')
    }
})

router.get('/edit', async (req, res) => {
    try{
        res.render('profile/edit', {user: req.user})
    } catch{
        res.redirect('/login')
    }
})

router.put('/edit', async (req, res) => {
    let user
    try{
        user = await User.findById(req.user._id)
        user.name = req.body.name
        user.email = req.body.email
        if(req.body.profilePicture != null && req.body.profilePicture !== ''){
            saveProfilePicture(user, req.body.profilePicture)
        }
        await user.save()
        res.redirect('/profile')
    } catch{
        res.render('profile/show', {user: req.user})
    }
})

function saveProfilePicture(user, pictureEncoded){
    if(pictureEncoded == null){
        return
    }
    const picture = JSON.parse(pictureEncoded)
    if(picture != null && imageMimeTypes.includes(picture.type)){
        user.profilePicture = new Buffer.from(picture.data, 'base64')
        user.profilePictureType = picture.type
    }
}

module.exports = router