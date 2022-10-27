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

//動態路由呈現給予show.handlebars對應的資訊
app.get("/restaurants/:RestaurantID", (req, res) => {
  let RestaurantID = req.params.RestaurantID;
  let restaurant = restaurantList.results.find(
    (r) => r.id === Number(RestaurantID)
  );
  res.render("show", { restaurant: restaurant });
});

//動態路由，在req.query(<form>才有)中擷取keyword，再搭配filter, includes的功能呈現搜尋結果
app.get("/search", (req, res) => {
  let keyword = req.query.keyword.trim();
  let restaurants = restaurantList.results.filter((r) =>
    r.name.toLowerCase().includes(keyword.toLowerCase())
  );

  if (restaurants.length == 1 || keyword == "") {
    res.render("index", { restaurants: restaurants, keyword: keyword });
  } else {
    res.render("no_results");
  }
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
