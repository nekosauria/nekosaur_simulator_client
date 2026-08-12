import { mockCountData } from "../mock/countMock.js";
import { mockUploadData } from "../mock/uploadMock.js";
import { API_BASE_URL, USE_MOCK_DATA, MOCK_DELAY_MS } from "./config.js";

export { API_BASE_URL };

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function uploadImage(file, detectModel, transformModel, styleRef) {
    if (USE_MOCK_DATA) {
        await delay(MOCK_DELAY_MS.upload);
        return mockUploadData;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("detect_model", detectModel);
    formData.append("transform_model", transformModel);
    if (styleRef) {
        formData.append("style_ref_path", styleRef);
    }

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function getCount() {
    if (USE_MOCK_DATA) {
        await delay(MOCK_DELAY_MS.count);
        return mockCountData;
    }

    const response = await fetch(`${API_BASE_URL}/count`);

    if (!response.ok) {
        throw new Error(`Get count failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
}