const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

// router.post(
//   '/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/users/login',
//     failureFlash: true,
//   })
// )

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
