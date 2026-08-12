import ImagePreview from "../ImagePreview";
import CrossOriginDownloadButton from "../CrossOriginDownloadButton.jsx";
import { formatDateTime } from "../../util/datetime";

function DetectorResultRow({ detector, title = "貓貓辨識結果" }) {
    if (!detector) return null;

    const {
        detect_path: detectPath,
        has_cat: hasCat,
        is_preprocessed: isPreprocessed,
        predict_list: predictList,
        tag_results: tagResults,
        created_at: createdAt,
        costs,
    } = detector;

    const hasResults = tagResults && Object.keys(tagResults).length > 0;
    const hasList = predictList && Object.keys(predictList).length > 0;
    const hasBadges = Boolean(isPreprocessed || hasCat !== undefined);
    const validCosts = (costs || []).filter(c => c.value != null);

    return (
        <ImagePreview title={title} image={detectPath}>
            <div className="preview-details">

                {/* 徽章標籤區塊 */}
                {hasBadges && (
                    <div className="detail-block">
                        <h3 className="detail-block-title">狀態標籤</h3>
                        <div className="preview-badges">
                            {/* 貓咪偵測狀態：二選一 */}
                            <span className={`preview-badge ${hasCat ? 'preview-badge--success' : 'preview-badge--muted'}`}>
                                {hasCat ? '偵測到貓咪' : '未偵測到貓咪'}
                            </span>

                            {/*快取狀態 */}
                            {isPreprocessed && (
                                <span className="preview-badge preview-badge--info">Cache Hit</span>
                            )}
                        </div>
                    </div>
                )}

                {/* 辨識結果 + 全部預測類別（合併同一區塊） */}
                {(hasResults || hasList) && (
                    <div className="detail-block">
                        {hasResults && (
                            <>
                                <h3 className="detail-block-title">圖片辨識結果</h3>
                                <ul className="predict-list">
                                    {Object.entries(tagResults).map(([label, score]) => (
                                        <li key={label}>
                                            <span>{label}: </span>
                                            <span>{(score * 100).toFixed(2)}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {hasList && (
                            <>
                                <h3 className="detail-block-title">全部預測類別</h3>
                                <ul className="predict-list">
                                    {Object.entries(predictList).map(([label, score]) => (
                                        <li key={label}>
                                            <span>{label}: </span>
                                            <span>{(score * 100).toFixed(2)}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}

                {/* 建立時間 + 耗時（耗時靠右） */}
                {(createdAt || validCosts.length > 0) && (
                    <div className="detail-block">
                        <br/>
                        <p className="preview-cost ">
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
                            <CrossOriginDownloadButton url={detectPath} />
                        </p>
                    </div>
                )}
            </div>
        </ImagePreview>
    );
}

export default DetectorResultRow;