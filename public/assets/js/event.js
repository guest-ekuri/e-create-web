document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // スライダー
    // ============================================

    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.dot');
    const slideTitle = document.getElementById('slide-title');

    // 画像データを slides から収集
    const imageData = Array.from(slides).map(slide => ({
        src:     slide.querySelector('img')?.getAttribute('src') || '',
        caption: slide.getAttribute('data-title') || '',
    }));

    if (slides.length <= 1) {
        document.getElementById('prev-btn')?.classList.add('hidden');
        document.getElementById('next-btn')?.classList.add('hidden');
    }

    let currentIndex = 0;
    let slideTimer;

    const updateSlider = () => {
        // スライド切り替え
        slides.forEach((slide, i) => {
            slide.classList.toggle('opacity-100', i === currentIndex);
            slide.classList.toggle('z-10',        i === currentIndex);
            slide.classList.toggle('opacity-0',   i !== currentIndex);
            slide.classList.toggle('z-0',         i !== currentIndex);
        });
        // ドット
        dots.forEach((dot, i) => {
            dot.classList.toggle('opacity-100', i === currentIndex);
            dot.classList.toggle('opacity-50',  i !== currentIndex);
        });
        // タイトル
        if (slideTitle) {
            slideTitle.textContent = imageData[currentIndex]?.caption || '';
        }
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    };

    const startTimer = () => { slideTimer = setInterval(nextSlide, 5000); };
    const resetTimer = () => { clearInterval(slideTimer); startTimer(); };

    document.getElementById('prev-btn')?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
        resetTimer();
    });

    document.getElementById('next-btn')?.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    // 初期タイトルをセット
    updateSlider();
    if (slides.length > 1) startTimer();


    // ============================================
    // ライトボックス
    // ============================================

    const lightbox        = document.getElementById('lightbox');
    const lightboxImg     = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxDots    = document.getElementById('lightbox-dots');
    const lightboxClose   = document.getElementById('lightbox-close');
    const lightboxPrev    = document.getElementById('lightbox-prev');
    const lightboxNext    = document.getElementById('lightbox-next');

    let lbIndex = 0;

    // ライトボックス用ドットを生成
    const buildLightboxDots = () => {
        if (!lightboxDots) return;
        lightboxDots.innerHTML = '';
        imageData.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = `w-2.5 h-2.5 bg-white rounded-full transition cursor-pointer ${i === lbIndex ? 'opacity-100' : 'opacity-40'}`;
            dot.addEventListener('click', () => { lbIndex = i; updateLightbox(); });
            lightboxDots.appendChild(dot);
        });
    };

    const updateLightbox = () => {
        if (lightboxImg)     lightboxImg.src           = imageData[lbIndex]?.src || '';
        if (lightboxImg)     lightboxImg.alt           = imageData[lbIndex]?.caption || '';
        if (lightboxCaption) lightboxCaption.textContent = imageData[lbIndex]?.caption || '';

        // ドット更新
        if (lightboxDots) {
            lightboxDots.querySelectorAll('span').forEach((dot, i) => {
                dot.classList.toggle('opacity-100', i === lbIndex);
                dot.classList.toggle('opacity-40',  i !== lbIndex);
            });
        }

        // 1枚のみのとき矢印・ドットを非表示
        if (imageData.length <= 1) {
            lightboxPrev?.classList.add('hidden');
            lightboxNext?.classList.add('hidden');
            if (lightboxDots) lightboxDots.style.display = 'none';
        }
    };

    const openLightbox = (index) => {
        lbIndex = index;
        buildLightboxDots();
        updateLightbox();
        if (lightbox) lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (lightbox) lightbox.style.display = 'none';
        document.body.style.overflow = '';
    };

    // 全画面ボタン → 現在のスライドで開く
    document.getElementById('fullscreen-btn')?.addEventListener('click', () => {
        openLightbox(currentIndex);
    });

    // 閉じる
    lightboxClose?.addEventListener('click', closeLightbox);

    // 背景クリックで閉じる（画像・ボタン以外）
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // 前へ / 次へ
    lightboxPrev?.addEventListener('click', () => {
        lbIndex = (lbIndex - 1 + imageData.length) % imageData.length;
        updateLightbox();
    });
    lightboxNext?.addEventListener('click', () => {
        lbIndex = (lbIndex + 1) % imageData.length;
        updateLightbox();
    });

    // キーボード操作
    document.addEventListener('keydown', (e) => {
        if (!lightbox || lightbox.style.display === 'none') return;
        if (e.key === 'Escape')      closeLightbox();
        if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + imageData.length) % imageData.length; updateLightbox(); }
        if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % imageData.length; updateLightbox(); }
    });

    // スワイプ操作（モバイル）
    let touchStartX = 0;
    lightbox?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox?.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            lbIndex = diff > 0
                ? (lbIndex + 1) % imageData.length
                : (lbIndex - 1 + imageData.length) % imageData.length;
            updateLightbox();
        }
    }, { passive: true });

});