import type { StyleState } from '@fringeworks/style-utils';

/**
 * scrollbarのオプション
 */
export type ScrollbarOptions = {
  /**
   * 縦横共通のハンドルの色
   * - string: 全状態で同じ値
   * - { base?, hover?, active? }: 状態別に値を指定
   *   - active: thumbそのものにホバーしたときの色（WebKitのみ）
   */
  thumbColor?: StyleState<string, ThumbState>;

  /**
   * 横スクロールバーのハンドルの色
   */
  thumbColorX?: StyleState<string, ThumbState>;

  /**
   * 縦スクロールバーのハンドルの色
   */
  thumbColorY?: StyleState<string, ThumbState>;

  /**
   * 縦横共通のハンドルの太さ
   * - number: 全状態で同じ値（ホバーアニメーションなし）
   * - { base?, hover? }: 状態別に値を指定
   */
  thumbSize?: StyleState<number, ThumbState>;

  /**
   * 横スクロールバーのハンドルの太さ
   */
  thumbSizeX?: StyleState<number, ThumbState>;

  /**
   * 縦スクロールバーのハンドルの太さ
   */
  thumbSizeY?: StyleState<number, ThumbState>;

  /**
   * 縦横共通のハンドルの角丸
   * @default 'full'
   */
  thumbRadius?: StyleState<ThumbRadius, ThumbState>;

  /**
   * 横スクロールバーのハンドルの角丸
   */
  thumbRadiusX?: StyleState<ThumbRadius, ThumbState>;

  /**
   * 縦スクロールバーのハンドルの角丸
   */
  thumbRadiusY?: StyleState<ThumbRadius, ThumbState>;

  /**
   * 縦横共通のハンドルのボーダーの色（未指定時は transparent）
   * - string: 全状態で同じ値
   * - { base?, hover? }: 状態別に値を指定
   */
  thumbBorderColor?: StyleState<string, ThumbState>;

  /**
   * 横スクロールバーのハンドルのボーダーの色
   */
  thumbBorderColorX?: StyleState<string, ThumbState>;

  /**
   * 縦スクロールバーのハンドルのボーダーの色
   */
  thumbBorderColorY?: StyleState<string, ThumbState>;

  /**
   * 縦横共通のハンドルのボーダーの太さ
   * - number: 全状態で同じ値
   * - { base?, hover? }: 状態別に値を指定
   */
  thumbBorderWidth?: StyleState<ThumbBorderWidth, ThumbState>;

  /**
   * 横スクロールバーのハンドルのボーダーの太さ
   */
  thumbBorderWidthX?: StyleState<ThumbBorderWidth, ThumbState>;

  /**
   * 縦スクロールバーのハンドルのボーダーの太さ
   */
  thumbBorderWidthY?: StyleState<ThumbBorderWidth, ThumbState>;

  /**
   * 縦横共通のトラックの色
   * - string: 全状態で同じ値
   * - { base?, hover? }: 状態別に値を指定
   */
  trackColor?: StyleState<string, TrackState>;

  /**
   * 横スクロールバーのトラックの色
   */
  trackColorX?: StyleState<string, TrackState>;

  /**
   * 縦スクロールバーのトラックの色
   */
  trackColorY?: StyleState<string, TrackState>;

  /**
   * 縦横共通のトラックの幅
   * - number: 指定値で固定（ホバー時も同じ幅）
   * - `'auto'`: thumbSize-active + 2×thumbBorderWidth に追従（hover 時にアニメーション）
   * - { base?, hover? }: 状態別に値を指定
   *
   * @default 'auto'
   */
  trackSize?: StyleState<TrackSize, TrackState>;

  /**
   * 横スクロールバーのトラックの幅
   * - number: 指定値で固定
   * - `'auto'`: thumbSizeX-active + 2×thumbBorderWidthX に追従
   * - { base?, hover? }: 状態別に値を指定
   */
  trackSizeX?: StyleState<TrackSize, TrackState>;

  /**
   * 縦スクロールバーのトラックの幅
   * - number: 指定値で固定
   * - `'auto'`: thumbSizeY-active + 2×thumbBorderWidthY に追従
   * - { base?, hover? }: 状態別に値を指定
   */
  trackSizeY?: StyleState<TrackSize, TrackState>;

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
