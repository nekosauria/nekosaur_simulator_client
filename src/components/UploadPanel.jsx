import { useState } from "react";
import ImagePreview from "./ImagePreview";
import { uploadImage } from "../services/api";

function UploadPanel() {
    const [originImage, setOriginImage] = useState(null);
    const [similarImage, setSimilarImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [done, setDone] = useState(false);
    const [success, setSuccess] = useState(false);

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
            const firstResponse = await uploadImage(file);
            if (firstResponse.success) {
                setSuccess(true);
                setSimilarImage(firstResponse.similar_image);
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
        setMessage("");
        setDone(false);
        setSuccess(false);
    };

    return (
        <section className="upload-section">
            <div className="upload-box">
                {!done && !loading && (
                    <label className="upload-label">
                        上傳貓貓圖片
                        <input type="file" accept="image/*" onChange={handleUpload} hidden />
                    </label>
                )}

                {loading && <p className="loading-text">Image Detector & Machine Learning Model 正在努力畫圖中...</p>}
                {message && <p className="error-text">{message}</p>}
            </div>

            {originImage && success && ( // ← 有圖就馬上顯示，不等 done
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
                            <ImagePreview title="原始圖片貓貓辨識" image={originImage} />
                            <ImagePreview title="向量搜尋相似圖片" image={similarImage} />
                        </div>
                    </div>

                    <div className="result-row">
                        <h2 className="result-row-title">Style Transform</h2>
                        <div className="preview-grid">
                            <ImagePreview title="原始圖片風格轉換" image={originImage} />
                            <ImagePreview title="相似圖片風格轉換" image={similarImage} />
                        </div>
                    </div>

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