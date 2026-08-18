// 取得環境變數的 API Base URL
const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

// 若 VITE_API_BASE_URL 未設定或留空，則預設走相對路徑 '/api'
// 若有設定，則自動移除末尾多餘的斜線（例如：http://127.0.0.1:5656/ -> http://127.0.0.1:5656）
// 宣告 API_BASE_URL 變數
let apiBaseUrl = "/api";
// 判斷環境變數是否有值且不為空白
if (envBaseUrl && envBaseUrl.trim() !== "") {
    apiBaseUrl = envBaseUrl.trim().replace(/\/+$/, "");
}

export const API_BASE_URL = apiBaseUrl;

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

export const MOCK_DELAY_MS = {
    count: Number(import.meta.env.VITE_MOCK_DELAY_COUNT) || 300,
    upload: Number(import.meta.env.VITE_MOCK_DELAY_UPLOAD) || 2000
};