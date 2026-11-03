# @fringeworks/style-scroll

`@fringeworks/style-scroll` は、CSSによるスクロール関連スタイルの制御に特化した、誰かにとっては便利なライブラリです。\
オプションに応じたクラス名とCSS変数をオブジェクトとして返します。フレームワーク非依存でSSRにも対応しています。

**[English README is available here](./README.md)**

## 特徴

- フレームワーク非依存（あらゆるJS環境で動作）
- SSR対応（クラス名とインラインスタイルのオブジェクトを返すだけ）
- TypeScriptによる完全な型サポート

## インストール

```bash
npm install @fringeworks/style-scroll
# または
pnpm add @fringeworks/style-scroll
```

## 使い方

各関数は `{ className, style }` オブジェクトを返します。スクロールするコンテナーに適用してください。

```ts
import { scrollbar } from '@fringeworks/style-scroll';

const { className, style } = scrollbar({
  thumbSize: 6,
  thumbColor: 'rgba(0, 0, 0, 0.3)',
  trackColor: 'rgba(0, 0, 0, 0.05)',
});

// className: "frgs-scroll-scrollbar ..."
// style: { "--frgs-scroll-scrollbar-thumbSizeX": "6px", ... }
```

```html
<div
  class="frgs-scroll-scrollbar ..."
  style="--frgs-scroll-scrollbar-thumbSizeX: 6px; ..."
>
  <!-- スクロール可能なコンテンツ -->
</div>
```

### CSSの読み込み

関数はCSSをインポートしないため、SSRやReact Server Componentsでもそのまま使用できます。CSSは別途インポートしてください。

```ts
import { scrollbar } from '@fringeworks/style-scroll';

// 全スタイルをまとめてインポート
import '@fringeworks/style-scroll/styles.css';

// 必要なスタイルのみインポート
import '@fringeworks/style-scroll/scrollbar.css';
import '@fringeworks/style-scroll/snap.css';
```

CSSを自動的に読み込みたい場合は `with-css` 配下のモジュールを使用してください。CSSのインポートを扱えるバンドラーが必要です。

```ts
import { scrollbar, scrollSnap } from '@fringeworks/style-scroll/with-css';
```

### 縦横共通の指定と軸ごとの指定

`scrollbar`・`scrollSnap` とも、直下に指定したオプションは縦横共通です。縦横で異なる値にしたい場合は、`x`（横）・`y`（縦）の中で上書きします。

```ts
scrollbar({
  thumbColor: 'rgba(0, 0, 0, 0.3)', // 縦横共通
  x: { thumbColor: 'rgba(0, 0, 255, 0.3)' }, // 横のみ上書き
});

scrollSnap({
  align: 'start', // 縦横共通
  x: { align: 'center' }, // 横のみ上書き
});
```

### ステート別の指定（`StyleState`）

`scrollbar` の多くのオプションは、ホバーなどのステートごとに値を指定できます。単純な値を指定すると、全ステートで同じ値になります。

```ts
// 全ステートで同じ値
scrollbar({ thumbColor: 'rgba(0, 0, 0, 0.3)' });

// ステートごとに指定（省略したステートは既定値）
scrollbar({
  thumbColor: {
    base: 'rgba(0, 0, 0, 0.3)', // 通常時
    hover: 'rgba(0, 0, 0, 0.5)', // コンテナーにホバーしたとき
    active: 'rgba(0, 0, 0, 0.7)', // ハンドルそのものにホバーしたとき（WebKitのみ）
  },
});
```

| ステート | 適用されるとき                                                                   |
| -------- | -------------------------------------------------------------------------------- |
| `base`   | 通常時                                                                           |
| `hover`  | コンテナーにホバーしたとき                                                       |
| `active` | ハンドルそのものにホバーしたとき（WebKitのみ。`thumb` で始まる一部のオプション） |

`x`・`y` で軸ごとに指定した値はステートごとに優先され、軸ごとの値で省略したステートは縦横共通の値になります。

```ts
scrollbar({
  thumbColor: { base: 'rgba(0,0,0,0.3)', hover: 'rgba(0,0,0,0.5)' },
  // x に hover の指定がないため、横のホバー時は thumbColor の hover になる
  x: { thumbColor: { base: 'rgba(0,0,255,0.3)' } },
});
```

## API

### `scrollbar`

```ts
scrollbar(options?: ScrollbarOptions): ScrollStyle
```

スクロールバーの見た目をカスタマイズするクラス名とCSS変数を返します。

WebKitのスクロールバー（`::-webkit-scrollbar`）に対応したブラウザー（Chrome・Edge・Safari）では、すべてのオプションが適用されます。\
対応していないブラウザー（Firefox）では、`scrollbar-width` と `scrollbar-color` による色と幅の指定だけが適用されます（[非WebKitブラウザー](#非webkitブラウザー)を参照）。

| 引数       | 型                 | 説明             |
| ---------- | ------------------ | ---------------- |
| `options?` | `ScrollbarOptions` | 下記のオプション |

| オプション          | 型                                         | 説明                                                                                                             |
| ------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `thumbColor?`       | `StyleState<string, ThumbState>`           | ハンドルの色                                                                                                     |
| `thumbSize?`        | `StyleState<number, ThumbState>`           | ハンドルの太さ（px）。トラックより太い場合は、トラックの幅で頭打ちになる                                         |
| `thumbRadius?`      | `StyleState<ThumbRadius, ThumbState>`      | ハンドルの角丸。数値（px）・`'full'`（完全な角丸）・`'none'`（角丸なし）                                         |
| `thumbBorderColor?` | `StyleState<string, ThumbState>`           | ハンドルの線の色。線はトラックとハンドルの隙間に描かれる                                                         |
| `thumbBorderWidth?` | `StyleState<number, TrackState>`           | ハンドルの線の幅（px）。`trackSize` が `'auto'` のときだけ使う（[サイズの決まり方](#サイズの決まり方)を参照）    |
| `trackColor?`       | `StyleState<string, TrackState>`           | トラックの色                                                                                                     |
| `trackSize?`        | `StyleState<number, TrackState> \| 'auto'` | トラックの幅（px）。`'auto'` は `thumbSize + 2 × thumbBorderWidth` に追従する                                    |
| `x?`                | `ScrollbarAxisOptions`                     | 横スクロールバーだけに適用する、上記の `thumb`・`track` で始まるオプション                                       |
| `y?`                | `ScrollbarAxisOptions`                     | 縦スクロールバーだけに適用する、上記の `thumb`・`track` で始まるオプション                                       |
| `fallbackSize?`     | `ScrollbarFallbackSize`                    | 非WebKitブラウザー向けのスクロールバーの幅（`scrollbar-width`）。`'auto'`・`'thin'`・`'none'`。既定値は `'thin'` |
| `arrows?`           | `boolean`                                  | スクロールバーの端に矢印ボタンを表示する（WebKitのみ）。既定値は `false`                                         |
| `noAnimation?`      | `boolean`                                  | アニメーションを無効にする。既定値は `false`（[アニメーション](#アニメーション)を参照）                          |

```ts
import { scrollbar } from '@fringeworks/style-scroll';

const { className, style } = scrollbar({
  thumbColor: {
    base: 'rgba(0, 0, 0, 0.2)',
    hover: 'rgba(0, 0, 0, 0.4)',
    active: 'rgba(0, 0, 0, 0.6)',
  },
  thumbSize: { base: 5, hover: 9 },
  trackColor: 'rgba(128, 128, 128, 0.04)',
});
```

#### 既定値

オプションを省略したときの値です。

| オプション         | `base`                      | `hover`                     | `active`                   |
| ------------------ | --------------------------- | --------------------------- | -------------------------- |
| `thumbColor`       | `rgba(127, 127, 127, 0.1)`  | `rgba(127, 127, 127, 0.3)`  | `rgba(127, 127, 127, 0.5)` |
| `thumbSize`        | `5`                         | `7`                         | `7`                        |
| `thumbRadius`      | `'full'`                    | `'full'`                    | `'full'`                   |
| `thumbBorderColor` | 透明                        | 透明                        | 透明                       |
| `thumbBorderWidth` | `0`                         | `0`                         | －                         |
| `trackColor`       | `rgba(127, 127, 127, 0.04)` | `rgba(127, 127, 127, 0.04)` | －                         |
| `trackSize`        | `13`                        | `13`                        | －                         |

#### サイズの決まり方

ハンドルは、トラックの幅からハンドルの太さを引いた残りを線（border）にして、トラックの中央に描かれます。トラックの幅の決め方は2通りです。

- `trackSize` が数値（既定）: トラックの幅は指定した値で固定です。ハンドルは `thumbSize` の太さになり、残りの隙間は `thumbBorderColor` で塗られます。`thumbBorderWidth` は使いません。
- `trackSize` が `'auto'`: トラックの幅は `thumbSize + 2 × thumbBorderWidth` になります。`thumbSize` の hover を指定すると、コンテナーへのホバーでトラックも一緒に太くなります。

ハンドルそのものにホバーしたとき（`active`）は、トラックの幅は変わらず、ハンドルだけが `active` の太さになります。どちらの場合も、ハンドルがトラックより太くなる値を指定すると、トラックの幅で頭打ちになります。

```ts
// トラックは 13px のまま、ハンドルだけがホバーで太くなる
scrollbar({ thumbSize: { base: 5, hover: 9 } });

// トラックもハンドルと一緒に太くなる（ハンドルの周りに 2px の隙間）
scrollbar({
  thumbSize: { base: 5, hover: 9 },
  thumbBorderWidth: 2,
  trackSize: 'auto',
});

// 縦と横で異なる設定
scrollbar({ trackSize: 12, x: { trackSize: 'auto' } });
```

#### アニメーション

ステートが変わったときの値の変化は、サイズは 0.3 秒、色は 0.5 秒でアニメーションします。`noAnimation: true` を指定した場合と、OSの設定などで動きを減らす設定（`prefers-reduced-motion: reduce`）になっている環境では、アニメーションしません。

アニメーションは、適用した要素の `transition` プロパティで実現しています。そのため、同じ要素に別の `transition` を指定すると、どちらかが上書きされます。同じ要素で別のアニメーションも行いたい場合は、`noAnimation: true` を指定するか、スクロールするコンテナーを別の要素に分けてください。

#### 非WebKitブラウザー

WebKitのスクロールバーに対応していないブラウザー（Firefox）では、次の指定だけが適用されます。

| CSS プロパティ    | 値                                                         |
| ----------------- | ---------------------------------------------------------- |
| `scrollbar-width` | `fallbackSize`                                             |
| `scrollbar-color` | 縦（`y`）の `thumbColor` と `trackColor`（ステートも反映） |

縦横で別の色にはできないため、`x` に指定した色は使われません。

### `scrollSnap`

```ts
scrollSnap(options?: ScrollSnapOptions): ScrollStyle
```

スクロールスナップを設定するクラス名とCSS変数を返します。スクロールするコンテナーに適用してください。\
子要素のオプション（`align`・`stop`・`margin`）は、コンテナーの直接の子要素（`> *`）にまとめて適用されます。

スナップさせるには、`axis` と `align` の両方を指定してください。どちらかを省略するとスナップしません。

| 引数       | 型                  | 説明             |
| ---------- | ------------------- | ---------------- |
| `options?` | `ScrollSnapOptions` | 下記のオプション |

| オプション    | 型                      | 説明                                                                                                                     |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `axis?`       | `SnapAxis`              | スナップする軸（`scroll-snap-type`）。`'x'`・`'y'`・`'both'`・`'none'`。省略するとスナップしない                         |
| `strictness?` | `SnapStrictness`        | スナップの厳密さ。`'mandatory'`（必ずスナップ位置で止まる）・`'proximity'`（近い場合だけ止まる）。既定値は `'mandatory'` |
| `padding?`    | `number \| string`      | スナップ位置の基準をずらす量（`scroll-padding`）。固定ヘッダーの高さ分ずらす場合などに使う                               |
| `behavior?`   | `SnapBehavior`          | スクロールの動作（`scroll-behavior`）。`'auto'`・`'smooth'`・`'instant'`。省略するとブラウザーの既定                     |
| `align?`      | `SnapAlign`             | 子要素のどの位置をスナップ位置に揃えるか（`scroll-snap-align`）。`'start'`・`'center'`・`'end'`・`'none'`                |
| `stop?`       | `SnapStop`              | スナップ位置を通過できるか（`scroll-snap-stop`）。`'normal'`（勢いで通過できる）・`'always'`（必ず止まる）               |
| `margin?`     | `number \| string`      | 子要素側のスナップ位置をずらす量（`scroll-margin`）                                                                      |
| `x?`          | `ScrollSnapAxisOptions` | 横方向（インライン軸）だけに適用する `padding`・`align`・`margin`                                                        |
| `y?`          | `ScrollSnapAxisOptions` | 縦方向（ブロック軸）だけに適用する `padding`・`align`・`margin`                                                          |

`padding`・`margin` の数値は `px` 単位として扱われ、文字列はそのまま CSS の値として使われます。\
`x`・`y` に指定した値は、次の CSS プロパティになります。`align` の値が決まらない軸は `none` になります。

| 指定                     | CSS プロパティ                                  |
| ------------------------ | ----------------------------------------------- |
| `x.padding`・`y.padding` | `scroll-padding-inline`・`scroll-padding-block` |
| `x.margin`・`y.margin`   | `scroll-margin-inline`・`scroll-margin-block`   |
| `x.align`・`y.align`     | `scroll-snap-align: <y.align> <x.align>`        |

```ts
import { scrollSnap } from '@fringeworks/style-scroll';

// 縦方向にスクロールし、各子要素の先頭でスナップ
scrollSnap({ axis: 'y', align: 'start' });

// 横方向のカルーセル（近い場合だけスナップ）
scrollSnap({ axis: 'x', strictness: 'proximity', align: 'center' });

// 固定ヘッダーの高さ分だけスナップ位置を下にずらす
scrollSnap({ axis: 'y', align: 'start', y: { padding: 80 } });
```

#### 子要素ごとに個別に指定する

子要素のオプションは、指定したものだけが子要素に適用されます。また、詳細度を 0 にしているため、子要素に付けたクラスやインラインスタイルで個別に上書きできます。

```html
<div class="frgs-scroll-snap ..." style="...">
  <div>...</div>
  <div class="featured">...</div>
</div>
```

```css
.featured {
  scroll-snap-align: center;
}
```

### 型

| 型                      | 説明                                                                       |
| ----------------------- | -------------------------------------------------------------------------- |
| `ScrollStyle`           | 各関数の戻り値。`className` と `style`（CSS変数）を持つ                    |
| `CreateScrollStyle<O>`  | オプション `O` を受け取り `ScrollStyle` を返す関数の型                     |
| `ScrollbarOptions`      | `scrollbar` のオプション                                                   |
| `ScrollbarAxisOptions`  | `scrollbar` の `x`・`y` に指定できるオプション                             |
| `ThumbState`            | ハンドルのステート（`'hover' \| 'active'`）                                |
| `TrackState`            | トラックのステート（`'hover'`）                                            |
| `ThumbRadius`           | ハンドルの角丸（`number \| 'full' \| 'none'`）                             |
| `ScrollbarFallbackSize` | 非WebKitブラウザー向けのスクロールバーの幅（`'auto' \| 'thin' \| 'none'`） |
| `ScrollSnapOptions`     | `scrollSnap` のオプション                                                  |
| `ScrollSnapAxisOptions` | `scrollSnap` の `x`・`y` に指定できるオプション                            |
| `ScrollSnapItemOptions` | `scrollSnap` の子要素に適用するオプション                                  |
| `SnapAxis`              | スナップする軸（`'x' \| 'y' \| 'both' \| 'none'`）                         |
| `SnapStrictness`        | スナップの厳密さ（`'mandatory' \| 'proximity'`）                           |
| `SnapAlign`             | スナップ位置の揃え（`'start' \| 'center' \| 'end' \| 'none'`）             |
| `SnapStop`              | スナップ位置の通過（`'normal' \| 'always'`）                               |
| `SnapBehavior`          | スクロールの動作（`'auto' \| 'smooth' \| 'instant'`）                      |

`StyleState<T, S>` は `@fringeworks/style-utils` の型で、単純な値 `T` か、ステートごとの値 `{ base?: T; [state in S]?: T }` を受け付けます。

## 対応ブラウザー

本ライブラリはモダンCSSの標準仕様を用いて設計されており、下記のメジャーなブラウザーのバージョンに対応しています。

| ブラウザー      | 対応バージョン        | 対応バージョン（アニメーションなし） | スクロールバーのカスタマイズ        |
| --------------- | --------------------- | ------------------------------------ | ----------------------------------- |
| Google Chrome   | 88 (2021年1月) 以降   | 88 (2021年1月) 以降                  | すべてのオプション (WebKit)         |
| Microsoft Edge  | 88 (2021年1月) 以降   | 88 (2021年1月) 以降                  | すべてのオプション (WebKit)         |
| Apple Safari    | 16.4 (2023年3月) 以降 | 14.1 (2021年4月) 以降                | すべてのオプション (WebKit)         |
| Mozilla Firefox | 128 (2024年7月) 以降  | 83 (2020年11月) 以降                 | 色と幅のみ (`scrollbar-width` など) |

アニメーションには `@property` を使っています。`@property` に対応していないブラウザーでも、アニメーションしないだけで、その他の指定は適用されます。

## ライセンス

MIT
