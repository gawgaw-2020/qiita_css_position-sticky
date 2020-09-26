'use strict';

function addMarginTop() {
    // ヘッダーの高さを取得
    const height = document.getElementById('header').clientHeight;
    // 高さ文のマージンを適用する要素を取得
    const topImage = document.getElementById('top-image');
    setTimeout(() => {
      topImage.style.marginTop = height + 'px';
    }, 1000);
  
}

addMarginTop();

// ページ読み込み時にスタイルを追加
window.addEventListener('resize', () => {
  addMarginTop();
});

