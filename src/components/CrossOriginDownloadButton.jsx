async function handleDownload(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = objectUrl;
        a.download = filename || url.split("/").pop() || "download.jpg";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
    } catch (err) {
        console.error("下載失敗", err);
    }
}

function CrossOriginDownloadButton({ url, filename, label = "Download", className = "preview-download-button" }) {
    if (!url) return null;

    return (
        <button
            type="button"
            className={className}
            onClick={() => handleDownload(url, filename)}
        >
            {label}
        </button>
    );
}

export default CrossOriginDownloadButton;