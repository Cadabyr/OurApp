const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const auth = require('../public/javascripts/checkAuthentication')

router.get('/', async (req, res) => {
    try{
        auth.checkNotAuthenticated
        res.render('login.ejs')
    } catch{
        res.redirect('/login')
    }
})

router.post('/', async (req, res) => {
    try{
        auth.checkNotAuthenticated
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    } catch{
        res.redirect('/login')
    }
})

module.exports = router