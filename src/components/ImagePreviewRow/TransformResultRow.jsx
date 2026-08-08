import ImagePreview from "../ImagePreview";
import CrossOriginDownloadButton from "../CrossOriginDownloadButton.jsx";

function TransformResultRow({ transform }) {
    if (!transform) return null;

    const {
        transform_image: transformImage,
        is_cache: isCache,
        create_time: createTime,
        cost: cost
    } = transform;

    const hasBadges = Boolean(isCache);

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
                {(createTime || cost != null) && (
                    <div className="detail-block">
                        <p className="preview-cost">
                            <span>{cost != null && `處理耗時：${typeof cost === "number" ? cost.toFixed(3) : cost}s`}</span>
                            <span>{createTime && `圖片建立時間：${createTime}`}</span>
                            {/* 轉換結果下載 */}
                            <CrossOriginDownloadButton url={transformImage}  />
                        </p>
                    </div>
                )}
            </div>
        </ImagePreview>
    );
}

export default TransformResultRow;