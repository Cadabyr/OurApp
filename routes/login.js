const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        res.render('login.ejs')
    } catch{
        res.redirect('/login')
    }
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))


module.exports = router