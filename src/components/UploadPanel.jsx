import { useState } from "react";
import ImagePreview from "./ImagePreview";
import StyleRefModal from "./StyleRefModal";
import DetectorResultRow from "./ImagePreviewRow/DetectorResultRow";
import TransformResultRow from "./ImagePreviewRow/TransformResultRow";
import { uploadImage, API_BASE_URL } from "../services/api";

function UploadPanel({ onProcessCountUpdate, styleRefImagePaths = [] }) {
    const [originImage, setOriginImage] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [selectedStyleRef, setSelectedStyleRef] = useState(null);
    const [showStyleModal, setShowStyleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);
    const [detectModel, setDetectModel] = useState("yolo");
    const [transformModel, setTransformModel] = useState("stable_diffusion_transform");

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setMessage("");
        setResultData(null);
        setDone(false);
        setOriginImage(URL.createObjectURL(file));

        try {
            const response = await uploadImage(file, detectModel, transformModel, selectedStyleRef);
            if (response.success) {
                setResultData(response);
                onProcessCountUpdate?.(response.metrics?.image_process_count);
            } else {
                setMessage(response.error || "系統異常");
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
        setResultData(null);
        setShowStyleModal(false);
        setMessage("");
        setDone(false);
    };

    return (
        <section className="upload-section">
            <div className="upload-box">
                {!done && !loading && (
                    <div className="upload-main-row">
                        <label className="upload-label">
                            上傳貓貓圖片
                            <input type="file" accept="image/*" onChange={handleUpload} hidden />
                        </label>
                        <div className="style-ref-slot">
                            <div className="style-ref-picker">
                                <button
                                    type="button"
                                    className="style-ref-open-button"
                                    onClick={() => setShowStyleModal(true)}
                                >
                                    {selectedStyleRef ? "change dinosaur ?" : "choose your dinosaur（ optional ）"}
                                </button>

                                {selectedStyleRef && (
                                    <div className="style-ref-selected-preview">
                                        <img src={`${API_BASE_URL}/${selectedStyleRef}`} alt={selectedStyleRef} />
                                        <button
                                            type="button"
                                            className="style-ref-clear-button"
                                            onClick={() => setSelectedStyleRef(null)}
                                        >
                                            清除
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
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
                                    <option value="stable_diffusion_transform">stable_diffusion_transform</option>
                                    <option value="sd_image_variations_transform">sd_image_variations_transform</option>
                                </select>
                            </label>
                        </div>
                    </div>
                )}

                {showStyleModal && (
                    <StyleRefModal
                        paths={styleRefImagePaths}
                        initialSelected={selectedStyleRef}
                        onClose={() => setShowStyleModal(false)}
                        onConfirm={(path) => {
                            setSelectedStyleRef(path);
                            setShowStyleModal(false);
                        }}
                    />
                )}

                {loading && <p className="loading-text">Image Detector & Machine Learning Model 正在努力畫圖中...</p>}
                {message && <p className="error-text">{message}</p>}
            </div>

            {/* 原始圖片 */}
            {originImage && (
                <div className="result-row" style={{ marginBottom: "36px" }}>
                    <h2 className="result-row-title">Origin Image</h2>
                    <div className="preview-grid">
                        <ImagePreview title="原始圖片" image={originImage} />
                    </div>
                </div>
            )}

            <br/>
            {/* 結果呈現區域 */}
            {done && resultData && (
                <div className="result-section">
                    <div className="result-row">
                        <h2 className="result-row-title">Image Detector & Similar Search</h2>
                        <div className="preview-grid">
                            <DetectorResultRow detector={resultData.detector.origin} />
                            <DetectorResultRow detector={resultData.detector.similar} />
                        </div>
                    </div>

                    <div className="result-row">
                        <h2 className="result-row-title">Style Transform</h2>
                        <div className="preview-grid">
                            <TransformResultRow transform={resultData.transform.origin} />
                            <TransformResultRow transform={resultData.transform.similar} />
                        </div>
                    </div>

                    {resultData.metrics?.api_cost != null && (
                        <p className="total-cost">
                            {`｜ 本次總耗時：${typeof resultData.metrics.api_cost === "number" ? resultData.metrics.api_cost.toFixed(3) : resultData.metrics.api_cost}s`}
                        </p>
                    )}
                </div>
            )}

            {done && (
                <div className="reset-button-wrap">
                    <button className="reset-button" onClick={handleReset}>
                        ← 回首頁
                    </button>
                </div>
            )}
        </section>
    );
}

export default UploadPanel;