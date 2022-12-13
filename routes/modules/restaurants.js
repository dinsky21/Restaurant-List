// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

// create new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  const userId = req.user._id
  const {
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    description,
    rating,
    area,
  } = req.body

  return restaurantList
    .create({
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      description,
      rating,
      area,
      userId,
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Detail single page
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  restaurantList
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.error(error))
})

// edit function
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  restaurantList
    .findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  restaurantList
    .findOneAndUpdate({ _id, userId }, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.log(error))
})

// delete function
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  restaurantList
    .findOneAndRemove({ _id, userId })
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

// 匯出路由器
module.exports = router
