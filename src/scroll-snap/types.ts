import type { WithChildStyle } from '@fringeworks/style-utils';

type ScrollSnapContainerOptions = {
  /**
   * スナップ軸
   * - `'x'`: 横方向のみ
   * - `'y'`: 縦方向のみ
   * - `'both'`: 縦横両方
   * - `'none'`: スナップ無効
   */
  axis?: SnapAxis;

  /**
   * スナップの厳密さ
   * - `'mandatory'`: 必ずスナップ位置に停止（デフォルト）
   * - `'proximity'`: スナップ位置に近い場合のみ停止
   *
   * @default 'mandatory'
   */
  strictness?: SnapStrictness;

  /**
   * スクロールパディング（全辺）
   * スナップ位置の基準オフセット。固定ヘッダーの高さなどに使用する。
   * - number: px値
   * - string: CSS値（例: '80px', '10%'）
   */
  padding?: number | string;

  /**
   * 横方向のスクロールパディング（左右）
   * `scroll-padding-inline` に対応
   */
  paddingX?: number | string;

  /**
   * 縦方向のスクロールパディング（上下）
   * `scroll-padding-block` に対応
   */
  paddingY?: number | string;

  /**
   * スクロール動作
   * - `'auto'`: ブラウザのデフォルト（デフォルト）
   * - `'smooth'`: スムーズスクロール
   * - `'instant'`: 即時スクロール
   */
  behavior?: SnapBehavior;
};

/**
 * scrollSnapのオプション（コンテナ側）
 *
 * アイテムオプション（align, stop, margin など）を指定すると、
 * CSS の `> *` セレクタで全子要素に一括適用される。
 * 各アイテムに個別のスタイルを指定する場合は `scrollSnapItem()` を使用すること。
 */
export type ScrollSnapOptions = WithChildStyle<
  ScrollSnapItemOptions,
  ScrollSnapContainerOptions
>;

/**
 * scrollSnapItemのオプション（子要素側）
 */
export type ScrollSnapItemOptions = {
  /**
   * スナップ位置の揃え（縦横共通）
   * - `'start'`: 先頭に揃える
   * - `'center'`: 中央に揃える
   * - `'end'`: 末尾に揃える
   * - `'none'`: スナップしない
   */
  align?: SnapAlign;

  /**
   * 横方向（インライン軸）のスナップ位置の揃え
   */
  alignX?: SnapAlign;

  /**
   * 縦方向（ブロック軸）のスナップ位置の揃え
   */
  alignY?: SnapAlign;

  /**
   * スナップポイントの通過制御
   * - `'normal'`: スクロール速度によってスナップポイントを飛ばせる（デフォルト）
   * - `'always'`: 必ず各スナップポイントで停止する
   */
  stop?: SnapStop;

  /**
   * スクロールマージン（全辺）
   * スナップ位置から要素までのオフセット。
   * - number: px値
   * - string: CSS値
   */
  margin?: number | string;

  /**
   * 横方向のスクロールマージン（左右）
   * `scroll-margin-inline` に対応
   */
  marginX?: number | string;

  /**
   * 縦方向のスクロールマージン（上下）
   * `scroll-margin-block` に対応
   */
  marginY?: number | string;
};

/**
 * スナップ軸
 */
export type SnapAxis = 'x' | 'y' | 'both' | 'none';

/**
 * スナップの厳密さ
 */
export type SnapStrictness = 'mandatory' | 'proximity';

/**
 * スナップ揃え位置
 */
export type SnapAlign = 'start' | 'center' | 'end' | 'none';

/**
 * スナップポイントの通過制御
 */
export type SnapStop = 'always' | 'normal';

/**
 * スクロール動作
 */
export type SnapBehavior = 'smooth' | 'auto' | 'instant';
