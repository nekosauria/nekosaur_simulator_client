import { useState } from "react";
import ImagePreview from "./ImagePreview";
import { uploadImage } from "../services/api";

function UploadPanel({onProcessCountUpdate}) {
    const [originImage, setOriginImage] = useState(null);
    const [similarImage, setSimilarImage] = useState(null);
    const [detectorImage, setDetectorImage] = useState(null);
    const [originImageTransform, setOriginImageTransform] = useState(null);
    const [similarImageTransform, setSimilarImageTransform] = useState(null);
    const [predictList, setPredictList] = useState(null);
    const [tagResults, setTagResults] = useState(null);
    const [costs, setCosts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);
    const [success, setSuccess] = useState(false);
    const [detectModel, setDetectModel] = useState("yolo");
    const [transformModel, setTransformModel] = useState("sd_image_variations_transform");

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setLoading(true);
        setMessage("");
        setSimilarImage(null);
        setDone(false);
        setSuccess(false);
        const previewUrl = URL.createObjectURL(file);
        setOriginImage(previewUrl);

        try {
            const firstResponse = await uploadImage(file, detectModel, transformModel);
            if (firstResponse.success) {
                setSuccess(true);
                setSimilarImage(firstResponse.similar_image);
                setDetectorImage(firstResponse.detector_image);
                setOriginImageTransform(firstResponse.origin_image_transform);
                setSimilarImageTransform(firstResponse.similar_image_transform);
                setPredictList(firstResponse.predict_list);
                setTagResults(firstResponse.tag_results);
                setCosts({
                    detector: firstResponse.detector_image_cost,
                    similar: firstResponse.similar_image_cost,
                    originTransform: firstResponse.origin_image_transform_cost,
                    similarTransform: firstResponse.similar_image_transform_cost,
                    api: firstResponse.api_cost,
                });
                onProcessCountUpdate?.(firstResponse.image_process_count);
            } else {
                setMessage(firstResponse.error || "系統異常");
            }
        } catch (err) {
            console.error(err);
            setMessage("系統錯誤");
        } finally {
            setLoading(false);
            setDone(true);
        }
    };

    const handleReset = () => {
        setOriginImage(null);
        setSimilarImage(null);
        setDetectorImage(null);
        setOriginImageTransform(null);
        setSimilarImageTransform(null);
        setPredictList(null);
        setTagResults(null);
        setCosts(null);
        setMessage("");
        setDone(false);
        setSuccess(false);
    };

    return (
        <section className="upload-section">
            <div className="upload-box">
                {!done && !loading && (
                    <div className="upload-main-row">
                        <div />
                        <label className="upload-label">
                            上傳貓貓圖片
                            <input type="file" accept="image/*" onChange={handleUpload} hidden />
                        </label>
                        <div className="model-selectors">
                            <label>
                                Detect model
                                <select value={detectModel} onChange={e => setDetectModel(e.target.value)}>
                                    <option value="yolo">yolo</option>
                                    <option value="torch">torch</option>
                                </select>
                            </label>
                            <label>
                                Transform model
                                <select value={transformModel} onChange={e => setTransformModel(e.target.value)}>
                                    <option value="sd_image_variations_transform">sd_image_variations_transform</option>
                                    <option value="stable_diffusion_transform">stable_diffusion_transform</option>
                                </select>
                            </label>
                        </div>
                    </div>
                )}

                {loading && <p className="loading-text">Image Detector & Machine Learning Model 正在努力畫圖中...</p>}
                {message && <p className="error-text">{message}</p>}
            </div>

            {originImage && ( // ← 有圖就馬上顯示，不等 done
                <div className="result-row" style={{ marginBottom: "36px" }}>
                    <h2 className="result-row-title">Origin Image</h2>
                    <div className="preview-grid">
                        <ImagePreview title="原始圖片" image={originImage} />
                    </div>
                </div>
            )}

            {done && success && (
                <div className="result-section">

                    <div className="result-row">
                        <h2 className="result-row-title">Image Detector & Similar Search</h2>

                        <div className="preview-grid">
                            <ImagePreview title="原始圖片貓貓辨識" image={detectorImage}  cost={costs?.detector}>
                            {tagResults && (
                                    <div className="predict-block">
                                        <h3 className="predict-block-title">辨識結果</h3>
                                        <ul className="predict-list">
                                            {Object.entries(tagResults).map(([label, score]) => (
                                                <li key={label}>
                                                    {label}：{(score * 100).toFixed(2)}%
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {predictList && (
                                    <div className="predict-block">
                                        <h3 className="predict-block-title">全部預測類別</h3>
                                        <ul className="predict-list">
                                            {Object.entries(predictList).map(([label, score]) => (
                                                <li key={label}>
                                                    {label}：{(score * 100).toFixed(2)}%
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </ImagePreview>

                            <ImagePreview title="向量搜尋相似圖片" image={similarImage} cost={costs?.similar} />

                        </div>
                    </div>

                    <div className="result-row">
                        <h2 className="result-row-title">Style Transform</h2>
                        <div className="preview-grid">

                            <ImagePreview title="原始圖片風格轉換" image={originImageTransform} cost={costs?.originTransform} />

                            <ImagePreview title="相似圖片風格轉換" image={similarImageTransform} cost={costs?.similarTransform} />

                        </div>
                    </div>

                    {costs?.api != null && (
                        <p>{` ｜ 本次總耗時：${costs.api}s`}</p>
                    )}

                </div>
            )}

            {done && (
                <div className="reset-button-wrap"> {/* ← 新增 wrap 做置中 */}
                    <button className="reset-button" onClick={handleReset}>
                        ← 回首頁
                    </button>
                </div>
            )}
        </section>
    );
}

export default UploadPanel;