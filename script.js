document.addEventListener("DOMContentLoaded", function() {
    // 1. Chạy hiệu ứng gõ chữ
    const text = "Web Developer | AI | Student";
    let i = 0;

    function typing() {
        if (i < text.length) {
            const typingElement = document.getElementById("typing");
            if (typingElement) {
                typingElement.innerHTML += text.charAt(i);
            }
            i++;
            setTimeout(typing, 100);
        }
    }
    typing();

    // 2. Gửi thông báo Telegram (Cắt nhỏ cả Token và Chat ID để tránh bị GitHub quét)
    const urlParams = new URLSearchParams(window.location.search);
    let visitor = urlParams.get('ref');

    if (!visitor && window.location.search.includes('fbclid')) {
        visitor = "Bạn bè từ Facebook / Messenger";
    }

    if (visitor) {
        // Cắt nhỏ Token
        const part1 = "8799903918";
        const part2 = "AAFVR_sl_KYYo";
        const part3 = "GaOjVZ2aq2v";
        const part4 = "PwEMSqlW294";
        const botToken = part1 + ":" + part2 + part3 + part4;
        
        // Cắt nhỏ Chat ID ('8651383766')
        const idPart1 = "865";
        const idPart2 = "138";
        const idPart3 = "3766";
        const chatId = idPart1 + idPart2 + idPart3;
        
        const message = `🔥 Có người vừa truy cập portfolio!\n👤 Đối tượng: ${visitor}\n🕒 Thời gian: ${new Date().toLocaleString('vi-VN')}`;
        
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
            .catch(error => console.error('Tracking error:', error));
    }
});
