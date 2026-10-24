import type { StyleState } from '@fringeworks/style-utils';

/**
 * scrollbarのオプション
 *
 * 直下のスタイルは縦横共通。`x`・`y` で軸ごとに上書きできる
 */
export type ScrollbarOptions = ScrollbarAxisOptions & {
  /**
   * 横スクロールバーのスタイル
   * - 縦横共通の値をステートごとに上書きする
   */
  x?: ScrollbarAxisOptions;

  /**
   * 縦スクロールバーのスタイル
   * - 縦横共通の値をステートごとに上書きする
   */
  y?: ScrollbarAxisOptions;

  /**
   * 非WebKitブラウザー向けスクロールバーの幅プリセット（CSS の `scrollbar-width`）
   * - `'auto'`: ブラウザーの既定の幅
   * - `'thin'`: 細め
   * - `'none'`: 非表示（スクロール自体は維持）
   *
   * WebKitブラウザーでは無効。WebKit向けには trackSize を使用する
   *
   * @default 'thin'
   */
  fallbackSize?: ScrollbarFallbackSize;

  /**
   * スクロールバー端の矢印ボタンを表示する（WebKitのみ）
   *
   * @default false
   */
  arrows?: boolean;

  /**
   * アニメーション（transition）を無効にする
   *
   * `prefers-reduced-motion: reduce` の環境では、指定しなくても無効になる
   *
   * @default false
   */
  noAnimation?: boolean;
};

/**
 * 軸ごとに指定できるオプション（直下で縦横共通、または `x`・`y` で軸ごとに指定する）
 */
export type ScrollbarAxisOptions = {
  /**
   * ハンドルの色
   * - `hover`: コンテナにホバーしたときの色
   * - `active`: ハンドルそのものにホバーしたときの色（WebKitのみ）
   */
  thumbColor?: StyleState<string, ThumbState>;

  /**
   * ハンドルの太さ（px）
   *
   * トラックより太い場合は、トラックの幅で頭打ちになる
   */
  thumbSize?: StyleState<number, ThumbState>;

  /**
   * ハンドルの角丸
   *
   * @default 'full'
   */
  thumbRadius?: StyleState<ThumbRadius, ThumbState>;

  /**
   * ハンドルの線の色（未指定時は透明）
   *
   * 線はトラックとハンドルの隙間に描かれる
   */
  thumbBorderColor?: StyleState<string, ThumbState>;

  /**
   * ハンドルの線の幅（px）
   *
   * trackSize が `'auto'` のときだけ使い、トラックの幅を
   * `thumbSize + 2 × thumbBorderWidth` にする。
   * trackSize が数値のときは、線の幅は `(trackSize − thumbSize) / 2` になる
   *
   * @default 0
   */
  thumbBorderWidth?: StyleState<number, TrackState>;

  /**
   * トラックの色
   * - `hover`: コンテナにホバーしたときの色
   */
  trackColor?: StyleState<string, TrackState>;

  /**
   * トラックの幅
   * - number: 指定値で固定（px）
   * - `'auto'`: 全ステートで `thumbSize + 2 × thumbBorderWidth` に追従する
   *
   * @default 13
   */
  trackSize?: StyleState<number, TrackState> | 'auto';
};

/**
 * thumbのステート
 */
export type ThumbState = 'hover' | 'active';

/**
 * trackのステート
 */
export type TrackState = 'hover';

/**
 * thumbの角丸
 */
export type ThumbRadius = number | 'full' | 'none';

/**
 * 非WebKitブラウザー向けのスクロールバーの幅
 */
export type ScrollbarFallbackSize = 'auto' | 'thin' | 'none';
