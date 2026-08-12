document.addEventListener("DOMContentLoaded", function() {
    // 1. Chạy hiệu ứng gõ chữ
    const text = "Xin Chào, Rất Vui Khi Bạn Đã Vào Trang FaceBook Của Tôi. Đã Phát Hiện";
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

    // 2. Gửi thông báo Telegram (Đã thêm chống spam bằng sessionStorage)
    const urlParams = new URLSearchParams(window.location.search);
    let visitor = urlParams.get('ref');

    if (!visitor && window.location.search.includes('fbclid')) {
        visitor = "Bạn bè từ Facebook / Messenger";
    }

    // Kiểm tra nếu có visitor VÀ trình duyệt này CHƯA từng gửi tin nhắn trước đó
    if (visitor && !sessionStorage.getItem('sent_telegram')) {
        
        // Cắt nhỏ Token
        const part1 = "8799903918";
        const part2 = "AAFVR_sl_KYYo";
        const part3 = "GaOjVZ2aq2v";
        const part4 = "PwEMSqlW294";
        const botToken = part1 + ":" + part2 + part3 + part4;
        
        // Cắt nhỏ Chat ID
        const idPart1 = "865";
        const idPart2 = "138";
        const idPart3 = "3766";
        const chatId = idPart1 + idPart2 + idPart3;
        
        const message = `🔥 Có người vừa truy cập portfolio!\n👤 Đối tượng: ${visitor}\n🕒 Thời gian: ${new Date().toLocaleString('vi-VN')}`;
        
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
            .then(response => {
                if (response.ok) {
                    // Gửi thành công thì đánh dấu lại, từ lúc này F5 hay tải lại trang cũng không gửi nữa
                    sessionStorage.setItem('sent_telegram', 'true');
                }
            })
            .catch(error => console.error('Tracking error:', error));
    }
});
