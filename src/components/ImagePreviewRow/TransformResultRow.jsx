import ImagePreview from "../ImagePreview";
import CrossOriginDownloadButton from "../CrossOriginDownloadButton.jsx";
import { formatDateTime } from "../../util/datetime";

function TransformResultRow({ transform, title = "風格轉換結果" }) {
    if (!transform) return null;

    const {
        transform_path: transformPath,
        is_preprocessed: isPreprocessed,
        created_at: createdAt,
        costs,
    } = transform;

    const hasBadges = Boolean(isPreprocessed);
    const validCosts = (costs || []).filter(c => c.value != null);

    return (
        <ImagePreview title={title} image={transformPath}>
            <div className="preview-details">

                {/* 徽章標籤區塊 */}
                {hasBadges && (
                    <div className="detail-block">
                        <h3 className="detail-block-title">狀態標籤</h3>
                        <div className="preview-badges">
                            {isPreprocessed === true && (
                                <span className="preview-badge preview-badge--info">Cache Hit</span>
                            )}
                        </div>
                    </div>
                )}
                {/* 建立時間 + 耗時（耗時靠右） */}
                {(createdAt || validCosts.length > 0) && (
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
                            <span>{createdAt && `圖片建立時間：${formatDateTime(createdAt)}`}</span>
                            {/* 原圖下載 */}
                            <CrossOriginDownloadButton url={transformPath} />
                        </p>
                    </div>
                )}
            </div>
        </ImagePreview>
    );
}

export default TransformResultRow;