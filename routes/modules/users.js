const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const restaurantList = require('../../models/restaurant')
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'the email and password columns are required' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'password is not the same' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    })
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: 'email already exists' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => {
        User.create({ name, email, password: hash })
          .then(res.redirect('/'))
          .catch((err) => console.log(err))
      })
  })
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    req.flash('success_msg', 'You have logged out')
    res.redirect('/users/login')
  })
})

module.exports = router
