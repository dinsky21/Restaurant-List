// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

// create new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})
router.post('/', (req, res) => {
  return restaurantList
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Detail single page
router.get('/:id', (req, res) => {
  const id = req.params.id

  restaurantList
    .findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.error(error))
})

// edit function
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  restaurantList
    .findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id

  restaurantList
    .findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// delete function
router.delete('/:id', (req, res) => {
  const id = req.params.id

  restaurantList
    .findByIdAndRemove(id)
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

// 匯出路由器
module.exports = router
