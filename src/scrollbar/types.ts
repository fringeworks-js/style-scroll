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
   * 非WebKitブラウザ向けスクロールバーの幅プリセット（CSS scrollbar-width）
   * - `'auto'`: ブラウザデフォルト
   * - `'thin'`: 細め（デフォルト）
   * - `'none'`: 非表示（スクロール自体は維持）
   * WebKitブラウザでは無効。WebKit向けには trackSize を使用。
   *
   * @default 'auto'
   */
  fallbackSize?: FallbackSize;

  /**
   * スクロールバー端の矢印ボタンの表示・非表示
   * - `true`: 表示
   * - `false`: 非表示
   *
   * @default false
   */
  arrows?: boolean;

  /**
   * アニメーション（transition）の無効化
   * - `true`: 全アニメーションを無効化
   * - `{ size?, color? }`: グループ別に無効化
   *   - `size`: thumbSize・trackSize・thumbBorderWidth のtransitionを無効化
   *   - `color`: thumbColor・trackColor・thumbBorderColor のtransitionを無効化
   * 未指定・`false` はCSSデフォルト（transitionあり）
   */
  noAnimation?: NoAnimation;
};

/**
 * 軸ごとに指定できるオプション（直下で縦横共通、または `x`・`y` で軸ごとに指定する）
 */
export type ScrollbarAxisOptions = {
  /**
   * ハンドルの色
   * - string: 全状態で同じ値
   * - { base?, hover?, active? }: 状態別に値を指定
   *   - active: thumbそのものにホバーしたときの色（WebKitのみ）
   */
  thumbColor?: StyleState<string, ThumbState>;

  /**
   * ハンドルの太さ
   * - number: 全状態で同じ値（ホバーアニメーションなし）
   * - { base?, hover? }: 状態別に値を指定
   */
  thumbSize?: StyleState<number, ThumbState>;

  /**
   * ハンドルの角丸
   * @default 'full'
   */
  thumbRadius?: StyleState<ThumbRadius, ThumbState>;

  /**
   * ハンドルのボーダーの色（未指定時は transparent）
   * - string: 全状態で同じ値
   * - { base?, hover? }: 状態別に値を指定
   */
  thumbBorderColor?: StyleState<string, ThumbState>;

  /**
   * ハンドルのボーダーの太さ
   * - number: 全状態で同じ値
   * - { base?, hover? }: 状態別に値を指定
   */
  thumbBorderWidth?: StyleState<ThumbBorderWidth, ThumbState>;

  /**
   * トラックの色
   * - string: 全状態で同じ値
   * - { base?, hover? }: 状態別に値を指定
   */
  trackColor?: StyleState<string, TrackState>;

  /**
   * トラックの幅
   * - number: 指定値で固定（ホバー時も同じ幅）
   * - `'auto'`: 同じ軸の thumbSize-active + 2×thumbBorderWidth に追従（hover 時にアニメーション）
   * - { base?, hover? }: 状態別に値を指定
   *
   * @default 'auto'
   */
  trackSize?: StyleState<TrackSize, TrackState>;
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
 * thumbの幅
 */
type ThumbBorderWidth = number | 'auto';

/**
 * thumbの角丸
 */
type ThumbRadius = number | 'full' | 'none';

/**
 * trackの幅
 */
type TrackSize = number | 'auto';

/**
 * フォールバック時のスクロールバーの幅
 */
type FallbackSize = 'auto' | 'thin' | 'none';

/**
 * アニメーション（transition）の無効化
 * - `true`: 全アニメーションを無効化
 * - `{ size?, color? }`: グループ別に無効化
 *   - `size`: thumbSize・trackSize・thumbBorderWidth のtransitionを無効化
 *   - `color`: thumbColor・trackColor・thumbBorderColor のtransitionを無効化
 */
type NoAnimation =
  | boolean
  | {
      size?: boolean;
      color?: boolean;
    };
