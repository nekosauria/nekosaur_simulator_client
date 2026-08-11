import { useState } from "react";
import ImagePreview from "./ImagePreview";
import StyleRefModal from "./StyleRefModal";
import DetectorResultRow from "./ImagePreviewRow/DetectorResultRow";
import TransformResultRow from "./ImagePreviewRow/TransformResultRow";
import CrossOriginDownloadButton from "./CrossOriginDownloadButton.jsx";
import { uploadImage, API_BASE_URL } from "../services/api";
import { formatDateTimeFromUTC } from "../util/datetime";

function UploadPanel({ onProcessCountUpdate, styleRefImagePaths = [] }) {
    const [originImage, setOriginImage] = useState(null);
    const [resultData, setResultData] = useState(null);
    const [selectedStyleRef, setSelectedStyleRef] = useState(null);
    const [showStyleModal, setShowStyleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);
    const [detectModel, setDetectModel] = useState("yolo11n");
    const [transformModel, setTransformModel] = useState("stable-diffusion-v1-5");
    const [originFilename, setOriginFilename] = useState(null);
    const [uploadTime, setUploadTime] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setMessage("");
        setResultData(null);
        setDone(false);
        setOriginImage(URL.createObjectURL(file));
        setOriginFilename(file.name);
        setUploadTime(new Date().toISOString());

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
        setOriginFilename(null);
        setUploadTime(null);
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
                                    <option value="yolo11n">yolo</option>
                                    <option value="maskrcnn_model">torch</option>
                                </select>
                            </label>
                            <label>
                                Transform model
                                <select value={transformModel} onChange={e => setTransformModel(e.target.value)}>
                                    <option value="stable-diffusion-v1-5">stable_diffusion_transform</option>
                                    <option value="sd-image-variations-diffusers">sd_image_variations_transform</option>
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
                        <ImagePreview title="原始圖片" image={originImage}>
                            <div className="preview-details">
                                <div className="detail-block">
                                    <p className="preview-left">
                                        {uploadTime && `圖片上傳時間：${formatDateTimeFromUTC(uploadTime)}`}
                                    </p>
                                    <p className="preview-right">
                                        {/* 原始圖片下載 */}
                                        <CrossOriginDownloadButton url={originImage} filename={originFilename} />
                                    </p>
                                </div>
                            </div>
                        </ImagePreview>
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
                            <DetectorResultRow
                                title="原圖偵測結果"
                                detector={{
                                    ...resultData.detector.origin,
                                    costs: [
                                        { label: "物件偵測耗時", value: resultData.metrics?.origin_detector_cost },
                                        { label: "圖片驗證耗時", value: resultData.metrics?.image_validate_cost },
                                    ],
                                }}
                            />
                            <DetectorResultRow
                                title="相似圖偵測結果"
                                detector={{
                                    ...resultData.detector.similar,
                                    costs: [
                                        { label: "物件偵測耗時", value: resultData.metrics?.similar_detector_cost },
                                        { label: "向量搜尋耗時", value: resultData.metrics?.image_embedding_cost },
                                    ],
                                }}
                            />
                        </div>
                    </div>

                    <div className="result-row">
                        <h2 className="result-row-title">Style Transform</h2>
                        <div className="preview-grid">
                            <TransformResultRow
                                title="原圖風格轉換"
                                transform={{
                                    ...resultData.transform.origin,
                                    costs: [
                                        { label: "生成圖片耗時", value: resultData.metrics?.origin_transform_cost },
                                    ],
                                }}
                            />
                            <TransformResultRow
                                title="相似圖風格轉換"
                                transform={{
                                    ...resultData.transform.similar,
                                    costs: [
                                        { label: "生成圖片耗時", value: resultData.metrics?.similar_transform_cost },
                                    ],
                                }}
                            />
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
                        回首頁
                    </button>
                </div>
            )}
        </section>
    );
}

export default UploadPanel;