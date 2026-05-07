// DOMが読み込まれた後にスライダーをセットアップ
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length <= 1) {
        document.getElementById('prev-btn')?.classList.add('hidden');
        document.getElementById('next-btn')?.classList.add('hidden');
        return;
    }

    let currentIndex = 0;
    let slideTimer;

    const updateDisplay = () => {
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.classList.remove('opacity-0', 'z-0');
                slide.classList.add('opacity-100', 'z-10');
            } else {
                slide.classList.remove('opacity-100', 'z-10');
                slide.classList.add('opacity-0', 'z-0');
            }
        });

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.remove('opacity-50');
                dot.classList.add('opacity-100');
            } else {
                dot.classList.remove('opacity-100');
                dot.classList.add('opacity-50');
            }
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateDisplay();
    };

    const startTimer = () => {
        slideTimer = setInterval(nextSlide, 5000);
    };

    const resetTimer = () => {
        clearInterval(slideTimer);
        startTimer();
    };

    document.getElementById('prev-btn')?.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateDisplay();
        resetTimer();
    });

    document.getElementById('next-btn')?.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    startTimer();
});