export const API_BASE_URL = "http://localhost:5001";

export async function uploadImage(file, detectModel, transformModel, styleRef) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("detect_model", detectModel);
    formData.append("transform_model", transformModel);
    if (styleRef) {
        formData.append("style_ref_image", styleRef);
    }

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData
    });

    return response.json();
}

export async function getCount() {
    const response = await fetch(`${API_BASE_URL}/count`);
    return response.json();
}