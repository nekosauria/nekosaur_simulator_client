function ImagePreview({ title, image }) {
    if (!image) return null;

    return (
        <div className="preview-card">
            <h3>{title}</h3>

            <img
                src={image}
                alt={title}
                className="preview-image"
            />
        </div>
    );
}

export default ImagePreview;