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

    // 3. 検索機能
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        const lowerQuery = query.toLowerCase();
        
        // 検索対象のデータを定義
        const searchData = [
            { title: 'Lumière Moist Lotion (ローション/化粧水)', url: 'product1.html', category: 'Product' },
            { title: 'Éclat Radiance Serum (セラム/美容液)', url: 'product2.html', category: 'Product' },
            { title: 'Satin Smooth Cream (クリーム)', url: 'product3.html', category: 'Product' },
            { title: 'Pure Botanical Wash (洗顔料)', url: 'product4.html', category: 'Product' },
            { title: 'Velvet UV Protector (日焼け止め)', url: 'product5.html', category: 'Product' },
            { title: 'Golden Glow Facial Oil (オイル)', url: 'product6.html', category: 'Product' },
            { title: 'Floral Mist Body Milk (ボディミルク)', url: 'product7.html', category: 'Product' },
            { title: '新工場オープンのお知らせ', url: 'news1.html', category: 'News' },
            { title: 'ゴールデンウィークの営業について', url: 'news2.html', category: 'News' },
            { title: '新製品「プレミアムセラム」発売', url: 'news3.html', category: 'News' },
            { title: '春のスキンケアキャンペーン開始', url: 'news4.html', category: 'News' },
            { title: 'メディア掲載情報', url: 'news5.html', category: 'News' },
            { title: '会社概要', url: 'about.html', category: 'Info' },
            { title: '企業理念', url: 'philosophy.html', category: 'Info' }
        ];

        const results = searchData.filter(item => item.title.toLowerCase().includes(lowerQuery));
        
        // 検索表示用のエリアを構築
        const mainWrapper = document.querySelector('.site-wrapper');
        const hero = document.querySelector('.hero-slider');
        const news = document.querySelector('.news-section');
        const pickup = document.querySelector('.number-links-wrapper');
        
        // 既存のコンテンツを非表示（検索結果に集中させる）
        if(hero) hero.style.display = 'none';
        if(news) news.style.display = 'none';
        if(pickup) pickup.style.display = 'none';

        const resultContainer = document.createElement('div');
        resultContainer.className = 'container';
        resultContainer.style.padding = '50px 20px';
        resultContainer.style.minHeight = '60vh';

        let html = `<h2 class="section-title">Search Results</h2>`;
        html += `<p class="search-result-msg">「${query}」の検索結果: ${results.length}件</p>`;
        
        if (results.length > 0) {
            html += '<ul style="list-style:none; padding:0;">';
            results.forEach(item => {
                html += `
                    <li style="margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                        <span style="font-size: 0.8rem; color: #a8c1a3; font-weight: bold;">[${item.category}]</span><br>
                        <a href="${item.url}" style="text-decoration: none; color: #333; font-size: 1.1rem; font-weight: bold;">${item.title}</a>
                    </li>
                `;
            });
            html += '</ul>';
        } else {
            html += '<p style="text-align:center; color:#999; margin-top:40px;">該当する項目が見つかりませんでした。</p>';
        }
        
        html += '<div style="text-align:center; margin-top:40px;"><a href="index.html" style="color: #a8c1a3; font-weight: bold;">TOPに戻る</a></div>';
        
        resultContainer.innerHTML = html;
        const footer = document.querySelector('.site-footer');
        footer.parentNode.insertBefore(resultContainer, footer);
    }
});