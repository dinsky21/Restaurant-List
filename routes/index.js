// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入模組程式碼
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

//掛載authenticator middleware
const { authenticator } = require('../middleware/auth')

// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/users', users)
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router
