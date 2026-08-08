export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

export const MOCK_DELAY_MS = {
    count: Number(import.meta.env.VITE_MOCK_DELAY_COUNT),
    upload: Number(import.meta.env.VITE_MOCK_DELAY_UPLOAD)
};