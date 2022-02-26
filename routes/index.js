const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../public/javascripts/checkAuthentication')

router.get('/', async (req, res) => {
    try{
        auth.checkAuthenticated
        res.render('/', {name: req.user.name})
    } catch{
        res.redirect('/login')
    }
})

module.exports = router