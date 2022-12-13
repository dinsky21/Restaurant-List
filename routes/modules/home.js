// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')
const User = require('../../models/user')

// index page

router.get('/', (req, res) => {
  const userId = req.user._id
  restaurantList
    .find({ userId })
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

router.get('/AtoZ', (req, res) => {
  const userId = req.user._id
  restaurantList
    .find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

router.get('/ZtoA', (req, res) => {
  const userId = req.user._id
  restaurantList
    .find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

router.get('/sort_by_category', (req, res) => {
  const userId = req.user._id
  restaurantList
    .find({ userId })
    .lean()
    .sort({ category: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

router.get('/sort_by_location', (req, res) => {
  const userId = req.user._id
  restaurantList
    .find({ userId })
    .lean()
    .sort({ area: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})
// 匯出路由器
module.exports = router
