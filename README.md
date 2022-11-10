# Restaurant List
![餐廳清單](img/screen_shot.JPG)

## 介紹
可利用關鍵字搜尋餐廳名稱及類別，點擊各餐廳可得知相關詳細資訊

## 功能
1. 輸入關鍵字可搜尋餐廳名稱可篩選出相關餐廳
2. 點擊該餐廳可取得餐廳詳細資訊
3. 可編輯餐廳資訊
4. 可新增餐廳

## 開始使用
1. 請確認已安裝 node.js 與 npm (使用版本請見文件最下方)
2. 下載或clone 此專案至本地資料夾
    ```bash
   git clone https://github.com/dinsky21/Restaurant-List.git
   ```
3. 請先執行以下指令，建立種子資料
    ```bash
    npm run seed
    ```
4. 若要啟網站，使用teminal於該資料夾內執行

   ```bash
   npm run dev
   ```

5. 若看見下方訊息則代表網站順利運行，打開瀏覽器輸入網址 localhost:3000 可開始使用

   ```bash
   The express is running on localhost:3000
   ```
6. 若需結束local hosting，請於tirminal內按下crtl + c即可
     

## 開發工具
- node.js 16.17.0
- Express 4.18.2
- Express-Handlebars 3.0.0
- Bootstrap 5.1.3
- Font Awesome 5.8.1
- mongoose 6.7.0
- dotenv 16.0.3
