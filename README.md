# 🐱🦕 Nekosaur Simulator — Client

React 前端介面，連接 Nekosaur Simulator Service 服務，提供貓咪圖片上傳、風格轉換結果展示等功能。

---

## 專案簡介

使用者上傳一張貓咪照片後，系統會：

1. 驗證圖片是否包含貓咪
2. 在資料庫中搜尋最相似的貓咪圖片
3. 以 Nekosaur（恐龍風格）對原圖與相似圖進行風格轉換
4. 將三張結果回傳並顯示在前端

---

## Tech Stack

| 項目 | 技術 |
|------|------|
| Framework | React.js |
| 套件管理 | npm |
| HTTP 請求 | Fetch API / Axios |
| 後端服務 | Flask REST API |

---

## 頁面功能

### 首頁 `/`

- 顯示系統統計資訊（目前貓咪圖片總數，來自 SQLite）
- 入口導引至上傳功能

### 上傳頁面 `/upload`

- 使用者選擇並上傳本地貓咪圖片
- 呼叫後端 API 進行處理
- 等待期間顯示載入狀態

### 結果頁面

上傳完成後，展示圖片：

| 圖片               | 說明                       |
|------------------|--------------------------|
| 原始貓咪圖            | 使用者上傳原圖                  |
| 檢測貓咪圖            | 使用者上傳原圖，加上標注框線           |
| 相似貓咪圖            | 從 TheCatAPI 資料庫中找到的最相似貓咪 |
| 原圖（Nekosaur 風格）  | 使用者上傳的圖片，經風格轉換後的版本       |
| 相似圖（Nekosaur 風格） | 相似貓咪圖，經風格轉換後的版本          |

---

## 後端依賴

本前端需搭配 `nekosaur_simulator_server` 後端服務使用。

後端說明請參考 [`nekosaur_simulator_server/README.md`](https://github.com/nekosauria/nekosaur_simulator_server/blob/main/README.md)。

---

## 注意事項

- 上傳圖片請確保包含明顯的貓咪主體，非貓咪圖片將被後端拒絕
- 風格轉換運算量較大，請求可能需要較長等待時間，請勿重複請求
- 系統有並發上傳限制，同時間僅允許少量請求進行風格轉換
