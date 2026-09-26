# @niche-works/style-scroll

`@niche-works/style-scroll` は、CSSによるスクロール関連スタイルの制御に特化したニッチなライブラリです。\
オプションに応じたクラス名とCSS変数をオブジェクトとして返します。フレームワーク非依存でSSRにも対応しています。

**[English README is available here](./README.md)**

## 特徴

- フレームワーク非依存（あらゆるJS環境で動作）
- SSR対応（クラス名とインラインスタイルオブジェクトを返すだけ）
- TypeScriptによる完全な型サポート

## インストール

```bash
npm install @niche-works/style-scroll
# または
pnpm add @niche-works/style-scroll
```

## 使い方

各スタイル関数は `{ className, style }` オブジェクトを返します。対象要素に適用してください。

```ts
import { scrollbar } from '@niche-works/style-scroll';

const { className, style } = scrollbar({
  thumbSize: 6,
  thumbColor: 'rgba(0, 0, 0, 0.3)',
  trackColor: 'rgba(0, 0, 0, 0.05)',
});

// className: "lx-scroll-scrollbar ..."
// style: { "--lx-scroll-scrollbar-thumbSizeX": "6px", ... }
```

```html
<div
  class="lx-scroll-scrollbar ..."
  style="--lx-scroll-scrollbar-thumbSizeX: 6px; ..."
>
  <!-- スクロール可能なコンテンツ -->
</div>
```

### CSSの読み込み

デフォルトのインポートではCSSが自動的に読み込まれます。

```ts
import { scrollbar } from '@niche-works/style-scroll';
```

CSSと関数を個別に管理したい場合は `core` ディレクトリ配下のモジュールを使用してください。

```ts
import { scrollbar } from '@niche-works/style-scroll/core';

// 全スタイルをまとめてインポート
import '@niche-works/style-scroll/core/styles.css';

// 必要なスタイルのみインポート
import '@niche-works/style-scroll/core/scrollbar.css';
```

### `StyleState` について

多くのオプションは `StyleState<T, S>` 型を受け付けます。スカラー値またはステート別オブジェクトで指定できます。

```ts
// スカラー値: 全ステートに同じ値を適用
thumbColor: 'rgba(0, 0, 0, 0.3)'

// ステート別オブジェクト: ステートごとに値を指定
thumbColor: {
  base: 'rgba(0, 0, 0, 0.3)',   // 通常時
  hover: 'rgba(0, 0, 0, 0.5)',  // コンテナにホバー時
  active: 'rgba(0, 0, 0, 0.7)', // thumbに直接ホバー時（WebKitのみ）
}

// 一部のステートのみ指定も可能（未指定ステートは設定されない）
thumbColor: { hover: 'rgba(0, 0, 0, 0.5)' }
```

### 軸別指定と共通指定

縦横で異なる値を設定したい場合は、`X`（横）・`Y`（縦）サフィックス付きオプションを使用します。\
軸別の値が指定された場合はその値が優先され、未指定のステートは共通オプションの値にフォールバックします。

```ts
scrollbar({
  thumbColor: 'rgba(0, 0, 0, 0.3)', // 縦横共通
  thumbColorX: 'rgba(0, 0, 255, 0.3)', // 横のみ上書き

  // ホバー時: X軸は thumbColorX に指定がないため thumbColor の hover にフォールバック
  thumbColor: { base: 'rgba(0,0,0,0.3)', hover: 'rgba(0,0,0,0.5)' },
  thumbColorX: { base: 'rgba(0,0,255,0.3)' }, // X のホバーは上記 hover にフォールバック
});
```

## スタイル種別

### `scrollbar`

スクロールバーの見た目をカスタマイズします。

WebKitブラウザー（Chrome・Edge・Safari）では `::-webkit-scrollbar` を用いたフルカスタマイズが可能です。\
非WebKitブラウザー（Firefox）では `scrollbar-width` / `scrollbar-color` によるフォールバックが適用されます。

```ts
import { scrollbar } from '@niche-works/style-scroll';

const { className, style } = scrollbar({
  thumbColor: {
    base: 'rgba(0, 0, 0, 0.2)',
    hover: 'rgba(0, 0, 0, 0.4)',
    active: 'rgba(0, 0, 0, 0.6)',
  },
  thumbSize: { base: 5, hover: 9 },
  trackColor: 'rgba(128, 128, 128, 0.04)',
  thumbRadius: 'full',
  thumbBorderWidth: 2,
  thumbBorderColor: 'transparent',
});
```

#### CSSデフォルト値（WebKit）

オプション未指定時のCSSデフォルト値です。

| プロパティ         | デフォルト値                |
| ------------------ | --------------------------- |
| `thumbSize`        | `5` (通常) / `9` (ホバー)   |
| `thumbColor`       | `rgba(0, 0, 0, 0.1)`        |
| `thumbColor.hover` | `rgba(0, 0, 0, 0.3)`        |
| `trackColor`       | `rgba(128, 128, 128, 0.04)` |
| `thumbRadius`      | `'full'` (9999px)           |
| `thumbBorderWidth` | `2`                         |
| `thumbBorderColor` | `transparent`               |

## オプション（`ScrollbarOptions`）

### Thumb（ハンドル）

#### `thumbSize` — ハンドルの太さ

| オプション    | 型                               | ステート                  |
| ------------- | -------------------------------- | ------------------------- |
| `thumbSize?`  | `StyleState<number, ThumbState>` | `base`, `hover`, `active` |
| `thumbSizeX?` | `StyleState<number, ThumbState>` | `base`, `hover`, `active` |
| `thumbSizeY?` | `StyleState<number, ThumbState>` | `base`, `hover`, `active` |

数値は `px` 単位として扱われます。

```ts
// 縦横共通・全ステートで 6px
scrollbar({ thumbSize: 6 });

// 通常時 5px、ホバー時 9px
scrollbar({ thumbSize: { base: 5, hover: 9 } });

// 縦と横で異なる値
scrollbar({ thumbSize: 6, thumbSizeY: 10 });
```

#### `thumbColor` — ハンドルの色

| オプション     | 型                               | ステート                  |
| -------------- | -------------------------------- | ------------------------- |
| `thumbColor?`  | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbColorX?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbColorY?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |

- `hover`: コンテナにポインターがホバーしたときの色
- `active`: thumbそのものに直接ホバーしたときの色（WebKitのみ）

```ts
scrollbar({
  thumbColor: {
    base: 'rgba(0, 0, 0, 0.2)',
    hover: 'rgba(0, 0, 0, 0.4)',
    active: 'rgba(0, 0, 0, 0.6)',
  },
});
```

#### `thumbRadius` — ハンドルの角丸

| オプション      | 型                                    | ステート                  |
| --------------- | ------------------------------------- | ------------------------- |
| `thumbRadius?`  | `StyleState<ThumbRadius, ThumbState>` | `base`, `hover`, `active` |
| `thumbRadiusX?` | `StyleState<ThumbRadius, ThumbState>` | `base`, `hover`, `active` |
| `thumbRadiusY?` | `StyleState<ThumbRadius, ThumbState>` | `base`, `hover`, `active` |

##### `ThumbRadius` の値

| 値       | 変換結果 | 説明        |
| -------- | -------- | ----------- |
| `number` | `${n}px` | 指定値 (px) |
| `'full'` | `9999px` | 完全な角丸  |
| `'none'` | `0`      | 角丸なし    |

```ts
scrollbar({ thumbRadius: 'full' }); // 9999px
scrollbar({ thumbRadius: 'none' }); // 0
scrollbar({ thumbRadius: 4 }); // 4px
```

#### `thumbBorderWidth` — ハンドルのボーダーの太さ

| オプション           | 型                                         | ステート                  |
| -------------------- | ------------------------------------------ | ------------------------- |
| `thumbBorderWidth?`  | `StyleState<ThumbBorderWidth, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderWidthX?` | `StyleState<ThumbBorderWidth, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderWidthY?` | `StyleState<ThumbBorderWidth, ThumbState>` | `base`, `hover`, `active` |

##### `ThumbBorderWidth` の値

| 値       | 説明                                                        |
| -------- | ----------------------------------------------------------- |
| `number` | 固定幅 (px)                                                 |
| `'auto'` | thumbサイズのアニメーションに追従して自動調整（autoモード） |

> **autoモード**: `thumbBorderWidth` の base が `null`・`undefined`・`'auto'` のときautoモードが適用されます。\
> オプション未指定時（デフォルト）もautoモードが適用されます。

```ts
scrollbar({ thumbBorderWidth: 2 }); // 固定 2px
scrollbar({ thumbBorderWidth: 'auto' }); // autoモード
scrollbar({ thumbBorderWidthX: 2 }); // 横のみ固定、縦はautoモード
```

#### `thumbBorderColor` — ハンドルのボーダーの色

| オプション           | 型                               | ステート                  |
| -------------------- | -------------------------------- | ------------------------- |
| `thumbBorderColor?`  | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderColorX?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |
| `thumbBorderColorY?` | `StyleState<string, ThumbState>` | `base`, `hover`, `active` |

未指定時のCSSデフォルトは `transparent` です。

```ts
scrollbar({
  thumbBorderWidth: 2,
  thumbBorderColor: 'transparent', // thumbの背景が透けて見える
});
```

---

### Track（トラック）

#### `trackColor` — トラックの色

| オプション     | 型                               | ステート        |
| -------------- | -------------------------------- | --------------- |
| `trackColor?`  | `StyleState<string, TrackState>` | `base`, `hover` |
| `trackColorX?` | `StyleState<string, TrackState>` | `base`, `hover` |
| `trackColorY?` | `StyleState<string, TrackState>` | `base`, `hover` |

- `hover`: コンテナにポインターがホバーしたときの色

```ts
scrollbar({
  trackColor: {
    base: 'rgba(0, 0, 0, 0.04)',
    hover: 'rgba(0, 0, 0, 0.08)',
  },
});
```

#### `trackSize` — トラックの幅

| オプション    | 型                                  | ステート        |
| ------------- | ----------------------------------- | --------------- |
| `trackSize?`  | `StyleState<TrackSize, TrackState>` | `base`, `hover` |
| `trackSizeX?` | `StyleState<TrackSize, TrackState>` | `base`, `hover` |
| `trackSizeY?` | `StyleState<TrackSize, TrackState>` | `base`, `hover` |

##### `TrackSize` の値

| 値       | 説明                                                                            |
| -------- | ------------------------------------------------------------------------------- |
| `number` | 固定幅 (px)                                                                     |
| `'auto'` | `thumbSizeActive + 2×thumbBorderWidth` に追従。ホバー時にアニメーションして拡縮 |

> **autoモード**: `trackSize` に `'auto'` を指定するとautoモードが適用されます。

```ts
// 固定幅
scrollbar({ trackSize: 12 });

// autoモード（thumbサイズに追従）
scrollbar({ trackSize: 'auto' });

// 通常 8px・ホバー時 12px
scrollbar({ trackSize: { base: 8, hover: 12 } });

// 縦と横で異なる設定
scrollbar({ trackSize: 12, trackSizeX: 'auto' });
```

---

### その他

#### `fallbackSize` — 非WebKit向けフォールバック

| オプション      | 型                           | デフォルト |
| --------------- | ---------------------------- | ---------- |
| `fallbackSize?` | `'auto' \| 'thin' \| 'none'` | `'auto'`   |

非WebKitブラウザー（Firefox）向けの `scrollbar-width` CSSプロパティの値を制御します。WebKitブラウザーでは無効です。

| 値       | 説明                           |
| -------- | ------------------------------ |
| `'auto'` | ブラウザーデフォルト           |
| `'thin'` | 細め                           |
| `'none'` | 非表示（スクロール操作は維持） |

```ts
scrollbar({ fallbackSize: 'thin' });
```

#### `arrows` — 矢印ボタン

| オプション | 型        | デフォルト  |
| ---------- | --------- | ----------- |
| `arrows?`  | `boolean` | `undefined` |

スクロールバー端の矢印ボタンの表示・非表示を強制します（WebKitのみ有効）。

| 値          | 説明                                   |
| ----------- | -------------------------------------- |
| `true`      | 矢印ボタンを表示                       |
| `false`     | 矢印ボタンを非表示                     |
| `undefined` | クラス付与なし（ブラウザーデフォルト） |

```ts
scrollbar({ arrows: false }); // 矢印非表示
```

#### `noAnimation` — アニメーションの無効化

| オプション     | 型            | デフォルト  |
| -------------- | ------------- | ----------- |
| `noAnimation?` | `NoAnimation` | `undefined` |

トランジションアニメーションを無効化します。未指定時はアニメーションが有効です。

| 値                    | 説明                             |
| --------------------- | -------------------------------- |
| `undefined` / `false` | アニメーション有効（デフォルト） |
| `true`                | サイズ・カラー両方を無効化       |
| `{ size: true }`      | サイズ系のみ無効化               |
| `{ color: true }`     | カラー系のみ無効化               |

アニメーションはプロパティのグループ単位で制御できます。

| グループ | 対象プロパティ                                              |
| -------- | ----------------------------------------------------------- |
| `size`   | `thumbSize`, `trackSize`, `thumbBorderWidth`, `thumbRadius` |
| `color`  | `thumbColor`, `trackColor`, `thumbBorderColor`              |

```ts
// 全アニメーション無効
scrollbar({ noAnimation: true });

// サイズ系のみ無効
scrollbar({ noAnimation: { size: true } });

// カラー系のみ無効
scrollbar({ noAnimation: { color: true } });
```

---

## 型定義

```ts
/** thumbのステート */
type ThumbState = 'hover' | 'active';

/** trackのステート */
type TrackState = 'hover';

/** thumbのボーダー幅 */
type ThumbBorderWidth = number | 'auto';

/** thumbの角丸 */
type ThumbRadius = number | 'full' | 'none';

/** trackの幅 */
type TrackSize = number | 'auto';

/** 非WebKit向けフォールバックサイズ */
type FallbackSize = 'auto' | 'thin' | 'none';

/** アニメーション無効化の設定 */
type NoAnimation = boolean | { size?: boolean; color?: boolean };

/** ステート別の値型 */
type StyleState<T, S extends string> =
  | T
  | { [key in S]?: T }
  | { base?: T; [key in S]?: T };
```

## 戻り値

スタイル関数は `ScrollStyle` を返します。

```ts
type ScrollStyle = {
  className?: string;
  style?: {
    [key: `--${string}`]: string | undefined;
  };
};
```

## 動作環境（対応ブラウザー）

本ライブラリはモダンCSSの標準仕様を用いて設計されており、下記のメジャーなブラウザーのバージョンに対応しています。

| ブラウザー      | 対応バージョン        | 対応バージョン(アニメーションなし) | スクロールバーカスタマイズ         |
| --------------- | --------------------- | ---------------------------------- | ---------------------------------- |
| Google Chrome   | 85 (2020年8月) 以降   | 83 (2020年5月) 以降                | フルカスタマイズ (WebKit)          |
| Microsoft Edge  | 85 (2020年8月) 以降   | 83 (2020年5月) 以降                | フルカスタマイズ (WebKit)          |
| Apple Safari    | 16.4 (2023年3月) 以降 | 14.1 (2021年4月) 以降              | フルカスタマイズ (WebKit)          |
| Mozilla Firefox | 128 (2024年7月) 以降  | 83 (2020年11月) 以降               | フォールバック (`scrollbar-width`) |

> **WebKitブラウザー（Chrome・Edge・Safari）** では `::-webkit-scrollbar` を用いたフルカスタマイズが利用できます。\
> **非WebKitブラウザー（Firefox）** では `scrollbar-width` / `scrollbar-color` のみが適用されます（色と幅のみ制御可）。

## ライセンス

MIT
