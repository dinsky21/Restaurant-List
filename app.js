// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const restaurantList = require("./restaurant.json");
const exphbs = require("express-handlebars");

//射鏡樣本引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));

//透過這個方法告訴 Express 說要設定的 view engine 是 handlebars。
app.set("view engine", "handlebars");

// setting static files(讓靜態的static files如css, js檔案會先被找到並執行)
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  res.render("index", { restaurants: restaurantList.results });
});

//利用動態路由，在req.params中取得點擊的電影ID，在利用ID去資料庫中找到資料並呈現在show.handlbars網頁中
app.get("/restaurants/:RestaurantID", (req, res) => {
  let RestaurantID = req.params.RestaurantID;
  let restaurant = restaurantList.results.find(
    (r) => r.id === Number(RestaurantID)
  );
  res.render("show", { restaurant: restaurant });
});

// //同樣利用動態路由，在req.query(<form>才有)中擷取keyword，再搭配filter, includes的功能呈現搜尋結果
// app.get("/search", (req, res) => {
//   let keyword = req.query.keyword;
//   let movies = movieList.results.filter((m) =>
//     m.title.toLowerCase().includes(keyword.toLowerCase())
//   );
//   res.render("index", { movies: movies, keyword: keyword });
// });

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
