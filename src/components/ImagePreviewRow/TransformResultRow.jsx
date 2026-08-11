import ImagePreview from "../ImagePreview";
import CrossOriginDownloadButton from "../CrossOriginDownloadButton.jsx";

function TransformResultRow({ transform }) {
    if (!transform) return null;

    const {
        transform_image: transformImage,
        is_cache: isCache,
        create_time: createTime,
        costs,
    } = transform;

    const hasBadges = Boolean(isCache);
    const validCosts = (costs || []).filter(c => c.value != null);

    return (
        <ImagePreview title="風格轉換結果" image={transformImage}>
            <div className="preview-details">

                {/* 徽章標籤區塊 */}
                {hasBadges && (
                    <div className="preview-badges detail-block">
                        {isCache === true && (
                            <span className="preview-badge preview-badge--info">Cache Hit</span>
                        )}
                    </div>
                )}

                {/* 建立時間 + 耗時（耗時靠右） */}
                {(createTime || validCosts.length > 0) && (
                    <div className="detail-block">
                        <br/>
                        <p className="preview-cost">
                            {validCosts.map(({ label, value }, i) => (
                                <span key={label}>
                                    {i > 0 && "｜ "}
                                    {`${label}：${typeof value === "number" ? value.toFixed(3) : value}s`}
                                </span>
                            ))}
                        </p>
                        <p className="preview-left">
                            <span>{createTime && `圖片建立時間：${createTime}`}</span>
                            {/* 原圖下載 */}
                            <CrossOriginDownloadButton url={transformImage} />
                        </p>
                    </div>
                )}
            </div>
        </ImagePreview>
    );
}

export default TransformResultRow;