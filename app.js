// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;
const restaurantList = require("./restaurant.json"); //如果不加 "./" node會自己跑去node_modules裡面去找程式

//安裝 express-handlebars後呼叫來使用成為樣本引擎
const exphbs = require("express-handlebars");

//射鏡樣本引擎
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
//上面第一個參數是這個樣板引擎的名稱，第二個參數是放入和此樣板引擎相關的設定。這裡設定了預設的佈局（default layout）需使用名為 main 的檔案。稍後我們再來建立這支 main 檔案，並說明佈局的概念。
app.set("view engine", "handlebars");
//上面為透過這個方法告訴 Express 說要設定的 view engine 是 handlebars。

// setting static files(讓靜態的static files如css, js檔案會先被找到並執行)
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  // res.send("This is my movie list built with Express");

  // create a variable to store movieOne
  // const movieOne = {
  //   id: 1,
  //   title: "Here is Movie Title",
  //   image:
  //     "https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg",
  // };

  // past the movie data into 'index' partial template，把movieOne中的各項變數放進movie中被打包送到index.handlebars裡面
  // res.render("index", { movie: movieOne });

  //上述movieOne是一筆一筆資料慢慢填入，以下為將movies.json帶入，直接顯示80部電影的作法
  res.render("index", { restaurants: restaurantList.results });

  // res.render("index"); //會去render "views/index.handlebars"中的局部樣板 (partial template)
});

// //利用動態路由，在req.params中取得點擊的電影ID，在利用ID去資料庫中找到資料並呈現在show.handlbars網頁中
// app.get("/movies/:movieID", (req, res) => {
//   let movieID = req.params.movieID;
//   let movie = movieList.results.find((m) => m.id === Number(movieID));
//   res.render("show", { movie: movie });
// });

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
