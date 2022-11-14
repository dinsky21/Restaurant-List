// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

// search function 動態路由，在req.query(<form>才有)中擷取keyword，再搭配filter, includes的功能呈現搜尋結果
router.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  restaurantList
    .find()
    .lean()
    .then((restaurant) => {
      const restaurants = restaurant.filter(
        (r) =>
          r.name.toLowerCase().includes(keyword) || r.category.includes(keyword)
      )

      if (restaurants.length >= 1 || keyword === '') {
        res.render('index', { restaurants, keyword })
      } else {
        res.render('no_results')
      }
    })
    .catch((error) => console.log(error))
})
// 匯出路由器
module.exports = router
