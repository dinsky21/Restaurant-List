const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')
require('./config/mongoose')
// 射鏡樣本引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 透過這個方法告訴 Express 說要設定的 view engine 是 handlebars。
app.set('view engine', 'handlebars')
// setting static files(讓靜態的static files如css, js檔案會先被找到並執行)
app.use(express.static('public'))

app.use(methodOverride('_method'))

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 將 request 導入路由器
app.use(routes)

// start and listen on the Express server
app.listen(3000, () => {
  console.log(`Express is listening on localhost:3000`)
})
