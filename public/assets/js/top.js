// --- オープニング演出用スクリプト (SKIP機能付き) ---

let splashTimer;

// アニメーションを終了して画面を消す関数
function finishSplash() {
    const splash = document.getElementById('opening-splash');
    if (splash && !splash.classList.contains('splash-hidden')) {
        splash.classList.add('splash-hidden');
    }
}

// SKIPボタンが押された時の処理
function skipAnimation() {
    clearTimeout(splashTimer); // 自動終了タイマーを解除
    finishSplash(); // すぐに消す
}

// ページが読み込まれた時にタイマーをセット
document.addEventListener('DOMContentLoaded', () => {
    // 4.5秒後に自動で消す
    splashTimer = setTimeout(finishSplash, 4500); 
});