// シンプルなスライドショー用スクリプト
let currentSlide = 1;
let totalSlides = 0;

document.addEventListener('DOMContentLoaded', () => {
    // ページ内にある「slide-」で始まる要素の数を自動でカウント
    const slides = document.querySelectorAll('[id^="slide-"]');
    totalSlides = slides.length;

    // スライドが2枚以上ある場合のみ、5秒ごとの自動再生を開始
    if (totalSlides > 1) {
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
});

function changeSlide(direction) {
    if (totalSlides <= 1) return; // スライドが1枚以下の場合は何もしない

    // 現在のスライドを隠す
    document.getElementById(`slide-${currentSlide}`).classList.add('slide-hidden');
    document.getElementById(`slide-${currentSlide}`).classList.remove('slide-active');
    document.getElementById(`dot-${currentSlide}`).classList.add('opacity-50');
    document.getElementById(`dot-${currentSlide}`).classList.remove('opacity-100');

    // 次のスライド番号を計算
    currentSlide += direction;
    if (currentSlide > totalSlides) currentSlide = 1;
    if (currentSlide < 1) currentSlide = totalSlides;

    // 新しいスライドを表示
    document.getElementById(`slide-${currentSlide}`).classList.remove('slide-hidden');
    document.getElementById(`slide-${currentSlide}`).classList.add('slide-active');
    document.getElementById(`dot-${currentSlide}`).classList.remove('opacity-50');
    document.getElementById(`dot-${currentSlide}`).classList.add('opacity-100');
}