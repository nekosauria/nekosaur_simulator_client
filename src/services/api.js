export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("image", file);

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