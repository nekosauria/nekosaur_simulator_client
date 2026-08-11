// util/datetime.js

/**
 * 將後端傳來的本地時間字串（格式如 "2026-08-11 11:29:32"）
 * 轉成統一顯示格式：yyyy/M/d HH:mm:ss（24 小時制）
 * 不做任何時區轉換，因為 MariaDB created_at 目前存的就是伺服器本地時間
 * （DATETIME + CURRENT_TIMESTAMP，未設定 UTC time_zone）
 */
export function formatDateTime(input) {
    if (!input) return null;

    // "2026-08-11 11:29:32" -> ["2026-08-11", "11:29:32"]
    const [datePart, timePart] = String(input).trim().split(/[ T]/);
    if (!datePart) return input;

    const [year, month, day] = datePart.split("-").map(Number);
    if (!year || !month || !day) return input; // fallback，避免壞資料整個掛掉

    const formattedDate = `${year}/${month}/${day}`;

    if (!timePart) return formattedDate;

    return `${formattedDate} ${timePart}`;
}

/**
 * 將 UTC 時間字串
 * 轉成統一顯示格式：yyyy/M/d HH:mm:ss（24 小時制）
 */
export function formatDateTimeFromUTC(input) {
    if (!input) return null;

    // 若字串沒有明確時區標記（Z、+hh:mm、-hh:mm、GMT），
    // 視為 UTC naive 時間，補上 Z 讓 Date 正確當成 UTC 解析
    let normalized = input;
    if (typeof input === "string" && !/[zZ]|[+-]\d{2}:?\d{2}|GMT/.test(input)) {
        normalized = input.replace(" ", "T") + "Z";
    }

    const date = new Date(normalized);
    if (isNaN(date.getTime())) return input; // fallback，避免壞資料整個掛掉

    const formatter = new Intl.DateTimeFormat("zh-TW", {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    });

    const parts = formatter.formatToParts(date).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {});

    return `${parts.year}/${parts.month}/${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
}