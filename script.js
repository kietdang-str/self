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

    // 2. Gửi thông báo Telegram
    const urlParams = new URLSearchParams(window.location.search);
    let visitor = urlParams.get('ref');

    if (!visitor && window.location.search.includes('fbclid')) {
        visitor = "Bạn bè từ Facebook / Messenger";
    }

    if (visitor) {
        // Dùng token mới đã mã hóa Base64 chuẩn
        const botToken = atob('ODc5OTkwMzkxODpBQUZWUl9zbF9LWVlvR2FPallaMmFxMnZQd0VNU3FsVzI5NA==');
        const chatId = atob('ODY1MTM4Mzc2Ng==');
        
        const message = `🔥 Có người vừa truy cập portfolio!\n👤 Đối tượng: ${visitor}\n🕒 Thời gian: ${new Date().toLocaleString('vi-VN')}`;
        
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
            .catch(error => console.error('Tracking error:', error));
    }
});
