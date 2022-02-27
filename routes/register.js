const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')

router.get('/', async (req, res) => {
    try{
        res.render('register.ejs')
    } catch{
        res.redirect('/register')
    }
})

router.post('/', function(req, res) {
    User.register(new User({email: req.body.email, name: req.body.name}, ), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render('register.ejs', {user: user})
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/login')
        })
    })
})

module.exports = router