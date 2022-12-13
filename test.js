const restaurantList = require('./restaurant.json').results

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

console.log(SEED_USER[1].list[0].name)
