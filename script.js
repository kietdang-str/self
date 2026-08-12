
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
    typing(); // Gọi hàm chạy hiệu ứng

    // 2. Gửi thông báo về Telegram khi có người truy cập kèm link ?ref=...
    const urlParams = new URLSearchParams(window.location.search);
    const visitor = urlParams.get('ref');

    if (visitor) {
        const botToken = '8799903918:AAF3erJVlISNSD4OFvijVa1dVoyA0rYoI0U';
        const chatId = '8651383766'; 
        const message = `🔥 Có người vừa truy cập portfolio!\n👤 Đối tượng: ${visitor}\n🕒 Thời gian: ${new Date().toLocaleString('vi-VN')}`;
        
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`)
            .catch(error => console.error('Tracking error:', error));
    }
});
