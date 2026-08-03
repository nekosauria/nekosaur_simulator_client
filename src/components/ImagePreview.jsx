
function ImagePreview({ title, image, cost, children }) {
    if (!image) return null;

    return (
        <div className="preview-card">
            <h3>{title}</h3>

            <img
                src={image}
                alt={title}
                className="preview-image"
            />

            {children}

            {cost != null && <p className="preview-cost">耗時：{cost}s</p>}

        </div>
    );
}

export default ImagePreview;