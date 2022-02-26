const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const auth = require('../public/javascripts/checkAuthentication')

router.get('/', async (req, res) => {
    try{
        auth.checkNotAuthenticated
        res.render('register.ejs')
    } catch{
        res.redirect('/register')
    }
})


router.post('/', async (req, res) => {
    try{
        auth.checkNotAuthenticated
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await user.save()
        res.redirect('/login')
    } catch(e) {
        console.log(e)
        res.redirect('/register')
    }
})

module.exports = router