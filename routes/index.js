const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        res.render('index', {name: req.user.name})
    } catch{
        res.redirect('/login')
    }
})

module.exports = router