const express = require('express')
const passport = require('passport')
const router = express.Router()

// @desc Authenticat with google
// @route GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile'] }))

// @desc Google auth callback
// @route GET /auth/google/callback
router.get('/google/callback',passport.authenticate('google', {failureRedirect: '/'}),
    (req, res) => {
    res.render('./dashboard', {
    })
    })

// @dec Logout user
// Route /auth/loagout
router.get('/logout', (req, res) =>{
    req.logout()
    res.redirect('/')
})
module.exports = router