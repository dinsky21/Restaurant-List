require('dotenv').config({ override: true })
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const restaurantList = require('./models/restaurant')
const exphbs = require('express-handlebars')

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 射鏡樣本引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// 透過這個方法告訴 Express 說要設定的 view engine 是 handlebars。
app.set('view engine', 'handlebars')

// setting static files(讓靜態的static files如css, js檔案會先被找到並執行)
app.use(express.static('public'))

// routes setting
// index page
app.get('/', (req, res) => {
  restaurantList
    .find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants })) // 將資料傳給 index 樣板
    .catch((error) => console.error(error))
})

// 動態路由呈現給予show.handlebars對應的資訊
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id

  restaurantList
    .findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.error(error))
})

// // 動態路由，在req.query(<form>才有)中擷取keyword，再搭配filter, includes的功能呈現搜尋結果
// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.trim().toLowerCase()
//   const restaurants = restaurantList.filter(
//     (r) =>
//       r.name.toLowerCase().includes(keyword) || r.category.includes(keyword)
//   )

//   if (restaurants.length >= 1 || keyword === '') {
//     res.render('index', { restaurants, keyword })
//   } else {
//     res.render('no_results')
//   }
// })

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})
