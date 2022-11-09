require('dotenv').config({ override: true })
const mongoose = require('mongoose')
const Restaurant = require('../Restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json').results

// 加入這段 code, 僅在非正式環境時, 使用 dotenv

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < restaurantList.length; i++) {
    Restaurant.create({
      name: restaurantList[i].name,
      name_en: restaurantList[i].name_en,
      category: restaurantList[i].category,
      image: restaurantList[i].image,
      location: restaurantList[i].location,
      phone: restaurantList[i].phone,
      google_map: restaurantList[i].google_map,
      description: restaurantList[i].description,
      rating: restaurantList[i].rating,
    })
  }
  console.log('done')
})
