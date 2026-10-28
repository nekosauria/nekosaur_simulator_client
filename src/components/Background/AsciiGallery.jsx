import { useEffect, useRef } from "react";
import artItems from "./asciiArtItems.js";

// ================= 可調參數（都改這裡）=================
// 帶 [min, max] 的是範圍，每個圖案生成時會在範圍內隨機取值
const CONFIG = {
    // ---- 數量與外觀 ----
    COUNT: 20,                 // 畫面同時存在的圖案數量
    FONT_FAMILY: "monospace",  // 字體，必須是等寬字體否則圖案會變形
    SIZE: [10, 16],            // 字級範圍（px）
    LINE_HEIGHT: 1.25,         // 行高倍率（字級 x 此值）
    COLOR: "44, 76, 59",       // 文字顏色 RGB（深綠色），不含透明度
    ALPHA: [0.12, 0.30],       // 最大透明度範圍，越大越明顯（0~1）

    // ---- 生命週期 ----
    LIFE: [400, 900],          // 存活時間，單位為「60fps 下的幀數」（約 6.7~15 秒）
    FADE_IN_END: 0.25,         // 生命前 25% 用來淡入
    FADE_OUT_START: 0.75,      // 生命後 25%（從 75% 開始）淡出

    // ---- 移動 ----
    SPEED: [0.05, 0.30],       // 基本速度範圍（px/幀），越大飄越快
    TURN: [0.01, 0.05],        // 每幀隨機轉彎幅度（弧度），越大路線越彎
    BOOST_CHANCE: 0.002,       // 每幀觸發衝刺的機率（約每 8 秒一次）
    BOOST: [2, 4],             // 衝刺速度倍率範圍
    BOOST_DECAY: 0.03,         // 衝刺後減速的快慢（越大越快恢復）
    SHARP_TURN_CHANCE: 0.002,  // 每幀觸發突然大轉向的機率
    SHARP_TURN_ANGLE: Math.PI, // 突然轉向的最大角度範圍（弧度）

    // ---- 晃動（垂直於前進方向的左右搖擺）----
    WOBBLE_AMP: [0, 0.3],      // 晃動幅度，兩個都設 0 就不晃
    WOBBLE_SPEED: [0.01, 0.04],// 晃動頻率

    // ---- 擺動旋轉（以圖案中心為軸）----
    SWING_AMP: [0, 0.3],       // 旋轉角度（弧度），兩個都設 0 就不旋轉
    SWING_SPEED: [0.005, 0.025],// 旋轉擺動頻率

    // ---- 邊界 ----
    OFFSCREEN_MARGIN: 120,     // 圖案完全飄出畫面多少 px 後才重生
};
// ======================================================

const rand = (range) => range[0] + Math.random() * (range[1] - range[0]);

export default function AsciiGallery() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let W = 0, H = 0;
        function resize() {
            const dpr = window.devicePixelRatio || 1; // 高解析螢幕補償
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        window.addEventListener("resize", resize);
        resize();

        // 洗牌袋：每輪把全部圖案各發一次，發完重洗
        let bag = [];
        function nextArt() {
            if (bag.length === 0) {
                bag = artItems.map((_, i) => i);
                for (let i = bag.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [bag[i], bag[j]] = [bag[j], bag[i]];
                }
            }
            return artItems[bag.pop()];
        }

        function createEntity(randomProgress = false) {
            const art = nextArt();
            const size = rand(CONFIG.SIZE);
            const lineH = size * CONFIG.LINE_HEIGHT;

            ctx.font = `${size}px ${CONFIG.FONT_FAMILY}`;
            const w = Math.max(...art.map((l) => ctx.measureText(l).width));
            const h = art.length * lineH;
            const maxLife = rand(CONFIG.LIFE);

            return {
                art, size, lineH, w, h,
                x: Math.random() * W,
                y: Math.random() * H,

                heading: Math.random() * Math.PI * 2,
                speed: rand(CONFIG.SPEED),
                turn: rand(CONFIG.TURN),
                boost: 1,

                wobbleAmp: rand(CONFIG.WOBBLE_AMP),
                wobbleSpeed: rand(CONFIG.WOBBLE_SPEED),
                wobblePhase: Math.random() * Math.PI * 2,

                swingAmp: rand(CONFIG.SWING_AMP),
                swingSpeed: rand(CONFIG.SWING_SPEED),
                swingPhase: Math.random() * Math.PI * 2,

                alpha: 0,
                maxAlpha: rand(CONFIG.ALPHA),
                life: randomProgress ? Math.random() * maxLife : 0,
                maxLife,
            };
        }

        const entities = [];
        for (let i = 0; i < CONFIG.COUNT; i++) {
            entities.push(createEntity(true));
        }

        let rafId = 0;
        let last = performance.now();

        function animate(now) {
            // dt：以 60fps 為 1 的時間倍率，讓 120/144Hz 螢幕速度一致
            const dt = Math.min((now - last) / 16.667, 3);
            last = now;

            ctx.clearRect(0, 0, W, H);
            ctx.textBaseline = "alphabetic";

            entities.forEach((e, index) => {
                e.life += dt;

                // 1. 隨機漫步
                e.heading += (Math.random() - 0.5) * e.turn * 2 * dt;

                // 2. 偶爾突然衝刺或大轉向
                if (Math.random() < CONFIG.BOOST_CHANCE * dt) e.boost = rand(CONFIG.BOOST);
                if (Math.random() < CONFIG.SHARP_TURN_CHANCE * dt) {
                    e.heading += (Math.random() - 0.5) * CONFIG.SHARP_TURN_ANGLE;
                }
                e.boost += (1 - e.boost) * (1 - Math.pow(1 - CONFIG.BOOST_DECAY, dt));

                // 3. 位移 = 前進 + 垂直於前進方向的晃動
                const v = e.speed * e.boost;
                const wobble = Math.sin(e.life * e.wobbleSpeed + e.wobblePhase) * e.wobbleAmp;
                e.x += (Math.cos(e.heading) * v - Math.sin(e.heading) * wobble) * dt;
                e.y += (Math.sin(e.heading) * v + Math.cos(e.heading) * wobble) * dt;

                // 4. 淡入淡出
                const fadeIn = e.maxLife * CONFIG.FADE_IN_END;
                const fadeOut = e.maxLife * CONFIG.FADE_OUT_START;
                if (e.life < fadeIn) {
                    e.alpha = (e.life / fadeIn) * e.maxAlpha;
                } else if (e.life > fadeOut) {
                    e.alpha = ((e.maxLife - e.life) / (e.maxLife - fadeOut)) * e.maxAlpha;
                } else {
                    e.alpha = e.maxAlpha;
                }

                // 5. 壽命結束或完全飄出畫面 → 重生
                const m = CONFIG.OFFSCREEN_MARGIN;
                if (e.life > e.maxLife ||
                    e.x + e.w < -m || e.x > W + m ||
                    e.y + e.h < -m || e.y > H + m) {
                    entities[index] = createEntity(false);
                    return;
                }

                // 6. 繪製（以圖案中心為軸心擺動旋轉）
                const rot = Math.sin(e.life * e.swingSpeed + e.swingPhase) * e.swingAmp;
                ctx.save();
                ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
                ctx.rotate(rot);
                ctx.font = `${e.size}px ${CONFIG.FONT_FAMILY}`;
                ctx.fillStyle = `rgba(${CONFIG.COLOR}, ${Math.max(0, e.alpha)})`;
                e.art.forEach((line, i) => {
                    ctx.fillText(line, -e.w / 2, -e.h / 2 + i * e.lineH + e.size);
                });
                ctx.restore();
            });

            rafId = requestAnimationFrame(animate);
        }

        rafId = requestAnimationFrame(animate);

        // 元件卸載時清理，避免動畫與事件監聽殘留
        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: -1,
            }}
        />
    );
}