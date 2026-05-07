document.addEventListener('DOMContentLoaded', () => {
    const ITEMS_PER_PAGE = 10; // 1ページあたりの表示件数
    let currentPage = 1;
    let currentFilter = 'all';

    const items = Array.from(document.querySelectorAll('.event-item'));
    const filterBtns = document.querySelectorAll('.filter-btn');
    const paginationContainer = document.getElementById('pagination');
    const eventListContainer = document.getElementById('event-list');

    // リストの描画処理
    function render() {
        // 1. フィルターで対象アイテムを絞り込む
        const filteredItems = items.filter(item => {
            if (currentFilter === 'all') return true;
            const tags = item.getAttribute('data-tags').split(',');
            return tags.includes(currentFilter);
        });

        // 2. ページネーションの計算
        const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        // 3. 全アイテムを一度非表示にし、該当ページのアイテムだけ表示する
        items.forEach(item => item.style.display = 'none');
        filteredItems.slice(startIndex, endIndex).forEach(item => {
            item.style.display = 'block';
        });

        // 4. ページネーションボタンの生成
        renderPagination(totalPages);
    }

    // ページネーションボタンの生成
    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return; // 1ページしかない場合は非表示

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            // 現在のページは赤（アクセントカラー）、それ以外はグレー
            if (i === currentPage) {
                btn.className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold bg-accent text-white shadow-md';
            } else {
                btn.className = 'w-10 h-10 rounded-full flex items-center justify-center font-bold bg-surface-alt text-primary hover:bg-gray-200 border border-border transition cursor-pointer';
            }
            
            btn.addEventListener('click', () => {
                currentPage = i;
                render();
                // ページ切り替え時にリストの一番上にスクロール
                window.scrollTo({ top: eventListContainer.offsetTop - 100, behavior: 'smooth' });
            });

            paginationContainer.appendChild(btn);
        }
    }

    // フィルターボタンのクリックイベント
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // ボタンのデザインを切り替え
            filterBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white', 'shadow-md');
                b.classList.add('bg-surface-alt', 'text-primary');
            });
            e.currentTarget.classList.remove('bg-surface-alt', 'text-primary');
            e.currentTarget.classList.add('bg-primary', 'text-white', 'shadow-md');

            // フィルターを適用して1ページ目に戻る
            currentFilter = e.currentTarget.getAttribute('data-tag');
            currentPage = 1;
            render();
        });
    });

    // 初回レンダリング
    render();
});