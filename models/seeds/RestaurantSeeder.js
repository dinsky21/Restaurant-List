const Restaurant = require('../restaurant') // 載入 restaurant model
const restaurantList = require('../../restaurant.json').results
const User = require('../user')
const bcrypt = require('bcryptjs')

const db = require('../../config/mongoose')

const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
    list: restaurantList.slice(0, 3),
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    list: restaurantList.slice(3, 6),
  },
]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (k = 0; k < 2; k++) {
    const password = SEED_USER[k].password
    const email = SEED_USER[k].email
    const list = SEED_USER[k].list

    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          email,
          password: hash,
        })
      )
      .then((user) => {
        const userId = user._id
        return Promise.all(
          Array.from({ length: 3 }, (_, i) =>
            Restaurant.create({
              name: list[i].name,
              name_en: list[i].name_en,
              category: list[i].category,
              image: list[i].image,
              location: list[i].location,
              phone: list[i].phone,
              google_map: list[i].google_map,
              description: list[i].description,
              rating: list[i].rating,
              area: list[i].area,
              userId,
            })
          )
        )
      })
      .then(() => {
        console.log('done')
      })
  }
})
