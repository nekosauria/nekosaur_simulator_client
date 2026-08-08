import ImagePreview from "../ImagePreview";
import CrossOriginDownloadButton from "../CrossOriginDownloadButton.jsx";

function DetectorResultRow({ detector }) {
    if (!detector) return null;

    const {
        image,
        detect_image: detectImage,
        has_neko: hasNeko,
        is_cache: isCache,
        score_list: scoreList,
        score_results: scoreResults,
        create_time: createTime,
        cost: cost
    } = detector;

    const hasResults = scoreResults && Object.keys(scoreResults).length > 0;
    const hasList = scoreList && Object.keys(scoreList).length > 0;
    const hasBadges = Boolean(isCache || hasNeko !== undefined);

    return (
        <ImagePreview title="貓貓辨識結果" image={detectImage}>
            <div className="preview-details">

                {/* 徽章標籤區塊 */}
                {hasBadges && (
                    <div className="detail-block">
                        <h3 className="detail-block-title">狀態標籤</h3>
                        <div className="preview-badges">
                            {hasNeko === true && (
                                <span className="preview-badge preview-badge--success">偵測到貓咪</span>
                            )}
                            {hasNeko === false && (
                                <span className="preview-badge preview-badge--muted">未偵測到貓咪</span>
                            )}
                            {isCache === true && (
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
                                    {Object.entries(scoreResults).map(([label, score]) => (
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
                                    {Object.entries(scoreList).map(([label, score]) => (
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
                {(createTime || cost != null) && (
                    <div className="detail-block">
                        <p className="preview-cost ">
                            <span>{cost != null && `處理耗時：${typeof cost === "number" ? cost.toFixed(3) : cost}s`}</span>
                            <span>{createTime && `圖片建立時間：${createTime}`}</span>
                            {/* 原圖下載 */}
                            <CrossOriginDownloadButton url={image} />
                        </p>
                    </div>
                )}
            </div>
        </ImagePreview>
    );
}

export default DetectorResultRow;