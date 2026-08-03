import { useState } from "react";
import { API_BASE_URL } from "../services/api";

function StyleRefModal({ paths, initialSelected, onConfirm, onClose }) {
    const [tempSelected, setTempSelected] = useState(initialSelected);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
                <h3 className="modal-title">選擇風格參考圖</h3>

                <div className="modal-grid">
                    {paths.map(path => (
                        <button
                            key={path}
                            type="button"
                            className={`style-ref-thumb${tempSelected === path ? " selected" : ""}`}
                            onClick={() => setTempSelected(prev => prev === path ? null : path)}
                        >
                            <img src={`${API_BASE_URL}/${path}`} alt={path} />
                        </button>
                    ))}
                </div>

                {tempSelected && (
                    <div className="modal-preview">
                        <p className="modal-preview-title">預覽</p>
                        <img
                            src={`${API_BASE_URL}/${tempSelected}`}
                            alt={tempSelected}
                            className="modal-preview-image"
                        />
                    </div>
                )}

                <div className="modal-actions">
                    <button type="button" className="modal-cancel" onClick={onClose}>
                        取消
                    </button>
                    <button
                        type="button"
                        className="modal-confirm"
                        onClick={() => onConfirm(tempSelected)}
                    >
                        確認選擇
                    </button>
                </div>
            </div>
        </div>
    );
}

export default StyleRefModal;