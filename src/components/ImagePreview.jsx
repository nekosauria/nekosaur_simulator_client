function ImagePreview({ title, image, children }) {
    if (!image) return null;

    return (
        <div className="preview-card">
            <h3>{title}</h3>

            <img
                src={image}
                alt={title}
                className="preview-image"
            />

            {/*自定義內容*/}
            {children}

        </div>
    );
}

export default ImagePreview;