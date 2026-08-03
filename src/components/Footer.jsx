import { useEffect } from "react";
import { getCount } from "../services/api";

function Footer({count}) {
    useEffect(() => {
        getCount()
            .then(data => {
                document.documentElement.style.setProperty(
                    '--server-count',
                    `" 🐾  API 呼叫  ${data.image_process_count}  次"`
                );
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (count == null) return;
        document.documentElement.style.setProperty(
            '--server-count',
            `" 🐾  API 呼叫  ${count}  次"`
        );
    }, [count]);

    return (
        <footer className="footer">
            ⚠️ 圖片將用於 ML 模型優化。 ✨🧠
            <br />
            🔒 請勿上傳敏感內容。
            <br />
            🐱 請用貓咪圖片
        </footer>
    );
}

export default Footer;