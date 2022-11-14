const express = require('express')
const app = express()
const restaurantList = require('./models/restaurant')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('./config/mongoose')
// 射鏡樣本引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 透過這個方法告訴 Express 說要設定的 view engine 是 handlebars。
app.set('view engine', 'handlebars')
// setting static files(讓靜態的static files如css, js檔案會先被找到並執行)
app.use(express.static('public'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// index page
app.get('/', (req, res) => {
  restaurantList
    .find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

// create new restaurant
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  return restaurantList
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Detail single page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  restaurantList
    .findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.error(error))
})

// edit function
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  restaurantList
    .findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  restaurantList
    .findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// search function 動態路由，在req.query(<form>才有)中擷取keyword，再搭配filter, includes的功能呈現搜尋結果
app.get('/search', (req, res) => {
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

// delete function
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id

  restaurantList
    .findByIdAndRemove(id)
    .then(() => res.redirect(`/`))
    .catch((error) => console.log(error))
})

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})
