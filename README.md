# 🐱🦕 Nekosaur Simulator — Client

React 前端介面，專為 Nekosaur Simulator 設計的體驗平台。採用手繪塗鴉風格 UI，提供貓咪圖片上傳、即時狀態追蹤、YOLO 辨識結果與 Nekosaur 恐龍風格轉換展示。

---

💡 前端亮點與設計特色

* 內建 Mock Data 模式 (src/mock)：提供獨立開發現成的 `uploadMock.js` 與 `countMock.js`，無須啟動 Flask API 或 GPU 伺服器即可模擬完整上傳、多圖回應與統計數據查詢。
* 元件化展示層 (src/components/ImagePreviewRow)：獨立出 DetectorResultRow 與 TransformResultRow，針對 YOLO 偵測與模型風格轉換結果進行結構化呈現。
* 跨網域下載支援 (CrossOriginDownloadButton)：實作前端跨網域圖片下載機制，方便使用者儲存風格轉換後的貓咪圖。
* 輕量極簡架構：純 React (Vite) 搭配原生 CSS 打造客製化手繪塗鴉視覺，無額外複雜框架包袱。

---

🛠 Tech Stack

* Core Framework：React (Vite)
* HTTP & Services：Axios / Fetch (src/services/api.js)
* Mock Engine：純 JS Mock Data (src/mock/)
* Styling：Custom CSS (src/styles.css)

---

📌 模組與元件結構

* UploadPanel.jsx：圖片上傳與拖曳主要互動區塊。
* ImagePreviewRow/：
* DetectorResultRow.jsx：展示 YOLO 標注與偵測結果。
* TransformResultRow.jsx：展示原圖與相似圖融合恐龍風格（Nekosaur）後的轉換成果。


* CrossOriginDownloadButton.jsx：處理跨網域圖片下載。
* Stylerefmodal.jsx：風格參考與說明彈窗。
* Header.jsx / Footer.jsx：頁首與頁尾（包含圖片總數統計展示）。

---