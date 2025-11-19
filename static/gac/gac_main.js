document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// --- 作品輪播 (Carousel) 控制邏輯 ---
const slider = document.getElementById('works-slider');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cards = document.querySelectorAll('#works .work-card');

if (slider && prevBtn && nextBtn && cards.length > 0) {
    let currentIndex = 0;
    let itemsPerPage;
    let totalPages;

    function updateCarousel() {
        // 根據螢幕寬度決定每頁顯示數量
        itemsPerPage = window.innerWidth > 768 ? 3 : 1;
        totalPages = Math.ceil(cards.length / itemsPerPage);

        // 位移量是「當前頁碼」乘以「每一頁所佔的百分比」。
        // (100 / totalPages) 就是每一頁佔滑動軌道總寬度的百分比。
        const offset = -currentIndex * (100 / totalPages);
        slider.style.transform = `translateX(${offset}%)`;

        // 更新按鈕狀態
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalPages - 1;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // 當視窗大小改變時，重新計算
    window.addEventListener('resize', () => {
        // 重置到第一頁以避免排版錯亂
        currentIndex = 0;
        updateCarousel();
    });

    // 初始頁面載入時執行一次
    updateCarousel();
}