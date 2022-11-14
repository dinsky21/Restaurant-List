const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json').results

const db = require('../../config/mongoose')

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
      area: restaurantList[i].area,
    })
  }
  console.log('done')
})
