document.addEventListener('DOMContentLoaded', () => {
    // 1. 7枚メインスライダー
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 1) {
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 5000);
    }

    // 2. 3Dスライダー (バナーリンク)
    const cards = document.querySelectorAll('.num-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;

    function updateCarousel() {
        const isMobile = window.innerWidth <= 768;
        const gap = isMobile ? 100 : 160;

        cards.forEach((card, i) => {
            let diff = i - currentIndex;
            // 7枚のカードがループするように計算
            if (diff > cards.length / 2) diff -= cards.length;
            if (diff < -cards.length / 2) diff += cards.length;

            const tx = diff * gap;
            const scale = diff === 0 ? 1 : Math.max(0.6, 1 - Math.abs(diff) * 0.15);

            // 【修正箇所】表示するのは中央(0)と左右2枚(±1, ±2)の計5枚のみ
            const isVisible = Math.abs(diff) <= 2;

            // 5枚の範囲内なら不透明度を計算、範囲外なら完全に0（透明）にする
            const opacity = isVisible ? Math.max(0, 1 - Math.abs(diff) * 0.3) : 0;

            card.style.transform = `translateX(${tx}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.zIndex = 2000 - Math.abs(diff);

            // 【追加箇所】透明になったカードが裏でクリックされないように、要素自体を隠す
            card.style.visibility = isVisible ? 'visible' : 'hidden';
        });
    }

    if (prevBtn && nextBtn) {
        prevBtn.onclick = () => { currentIndex = (currentIndex - 1 + cards.length) % cards.length; updateCarousel(); };
        nextBtn.onclick = () => { currentIndex = (currentIndex + 1) % cards.length; updateCarousel(); };
    }
    updateCarousel();
});