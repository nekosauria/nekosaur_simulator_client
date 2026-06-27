export async function uploadImage(file, detectModel, transformModel) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("detect_model", detectModel);
    formData.append("transform_model", transformModel);

    const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData
    });

    return response.json();
}

export async function getCount() {
    const response = await fetch("http://localhost:5001/count");
    return response.json();
}