# headerを固定したら下の要素と重なる時の対処法（headerの高さが可変)

がうがうです。
headerを固定した時に下に続く要素が重なる時の対処法です。
試行錯誤して3種類試したので覚え書きです。

先日マークアップの練習としてそれっぽいページを作っていた時に
ヘッダーを固定すると、

1.ヘッダーと下に続く要素が重なる
2.ページ内リンクした時に見出しの位置がズレる

以上2点の問題が発生したので、色々調べてみました。

コードサンプル
<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="gawgaw-2020" data-slug-hash="RwadgzL" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="qiita_css_position-sticky/sample-failure">
  <span>See the Pen <a href="https://codepen.io/gawgaw-2020/pen/RwadgzL">
  qiita_css_position-sticky/sample-failure</a> by がうがう (<a href="https://codepen.io/gawgaw-2020">@gawgaw-2020</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

<img width="60%" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/697564/da43fb43-745c-a3b3-2a7a-c2899b4d41ae.png">
<img width="30%" src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/697564/3bff532b-ab24-00be-6e43-8a0c7e6eb531.png">

今回はヘッダーの高さがPC表示とスマホ表示で可変になっています。

## 結論　色々試した結果「position: sticky」が便利だった

様々なアプローチがあると思いますが、marginで高さをとったり、JavaScriptで挑戦してみましたが、
最終的に「position: sticky」が一番シンプルに記述できたので記事にしてみました。

### デモはこちら

#### position: stickyで解決
https://gawgaw-2020.github.io/qiita_css_position-sticky/sample-sticky/

#### CSSのみ。marginで解決
https://gawgaw-2020.github.io/qiita_css_position-sticky/sample-margin/index.html

#### JavaScriptで解決
https://gawgaw-2020.github.io/qiita_css_position-sticky/sample-js/index.html

#### GitHubはこちら
https://github.com/gawgaw-2020/qiita_css_position-sticky

## CSSのみ。position: stickyで解決
ヘッダータグの``position: fixed``を``position: sticky``に変更

```css
header {
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  height: 90px;
  /* ヘッダーを固定 */
  /* position: sticky;に変更 */
  position: sticky;
  top: 0;
  z-index: 9999;
}
```

``position: sticky``は
高さが保たれる
指定した位置にくっつく
といった特徴があるため、ヘッダーの高さが可変でも下に続く要素が隙間なく続いてくれました。

<p class="codepen" data-height="403" data-theme-id="dark" data-default-tab="css,result" data-user="gawgaw-2020" data-slug-hash="poyYrez" style="height: 403px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="qiita_css_position-sticky/sample-sticky">
  <span>See the Pen <a href="https://codepen.io/gawgaw-2020/pen/poyYrez">
  qiita_css_position-sticky/sample-sticky</a> by がうがう (<a href="https://codepen.io/gawgaw-2020">@gawgaw-2020</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## CSSのみ。marginで解決

参考にしたサイトでもこの方法で解決が多かったです。

1.後に続く要素の```margin-top```をヘッダーの高さ分とる

```css
.top-image {
  height: 800px;
  background-image: url(../img/top-image.jpeg);
  background-size: cover;
  background-position: center;
  /* ヘッダーの高さ分余白をとる */
  margin-top: 90px;
}
```

2.スマホ時にヘッダーの高さが変わるので、その分```margin-top```も修正

```css
@media screen and (max-width: 768px) {
 .top-image {
   margin-top: 40px;
 }
}
```
この方法の場合、ページによってヘッダーの高さが違う場合などに記述が増えたり、管理が大変だなと感じました。

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="gawgaw-2020" data-slug-hash="MWyxvVK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="qiita_css_position-sticky/sample-margin">
  <span>See the Pen <a href="https://codepen.io/gawgaw-2020/pen/MWyxvVK">
  qiita_css_position-sticky/sample-margin</a> by がうがう (<a href="https://codepen.io/gawgaw-2020">@gawgaw-2020</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## JavaScriptで解決（未解決?）

最近JavaScriptの勉強を始めたので、実は最初にこちらを試しました。
ヘッダーの高さが可変なので「読み込み時にヘッダーの高さを取得して、その分コンテンツを下げよう」というのが魂胆です。

```javascript
// ヘッダーの高さを取得
const height = document.getElementById('header').clientHeight;
// 高さ文のマージンを適用する要素を取得
const topImage = document.getElementById('top-image');

// ページ読み込み時にスタイルを追加
window.addEventListener('load', () => {
  topImage.style.marginTop = height + 'px';
});
```

今回はヘッダーの高さが可変のため、
最初に読み込んだ時と、画面幅が変わった場合に明らかにおかしい隙間が発生してしまいます。
![スクリーンショット 2020-09-26 12.44.25.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/697564/aecde213-f631-9dd4-3328-0b1f694fb0d8.png)


<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="gawgaw-2020" data-slug-hash="VwaRzby" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="VwaRzby">
  <span>See the Pen <a href="https://codepen.io/gawgaw-2020/pen/VwaRzby">
  VwaRzby</a> by がうがう (<a href="https://codepen.io/gawgaw-2020">@gawgaw-2020</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

resizeイベントと時間差での処理を使って実装でもいいかもしれないと書いていて思いました。

## ページ内リンクした時に見出しの位置を合わせる
こちらに関しては、今回はリンク先に「anchor」クラスを追加して対応しました。

```html
<section id="philosophy" class="philosophy anchor">
    <h2>企業理念</h2>
  </section>
  <section id="service" class="service anchor">
    <h2>事業紹介</h2>
  </section>
  <section id="contact" class="contact anchor">
    <h2>お問い合わせ</h2>
  </section>
```

```css
/* 数値は調整可能 */
 .anchor {
  padding-top: 120px;
  margin-top: -120px;
}
```

クラスつける前
![スクリーンショット 2020-09-26 12.16.53.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/697564/08ee532e-c1fd-bfb9-fb76-ba6fbd5190f1.png)


クラス追加後
![スクリーンショット 2020-09-26 12.17.12.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/697564/48c3c1f1-1280-474e-8097-7e1b3c31cf0a.png)

調整できました。
全てのリンク先にクラスをつけないといけないので、少し面倒臭いなぁと感じてしまうので
JavaScriptなどで調整する方法も調べてみたいと思います。

## 最後に
「header 固定? fixed & top して padding-top か margin-top して z-index でしょ」から
「他に方法ないかなぁ」と考えることができたので良かったと感じました!!

## 参考サイト

[positionプロパティを身に着けよう！stickyの仕様と使い方を解説！](https://www.asobou.co.jp/blog/web/css-sticky)