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
 * padding・align・margin は縦横共通。`x`・`y` で軸ごとに上書きできる
 */
export type ScrollSnapOptions = WithChildStyle<
  ScrollSnapItemOptions,
  ScrollSnapContainerOptions
> & {
  /**
   * 横方向（インライン軸）のオプション
   * - 縦横共通の値を上書きする
   */
  x?: ScrollSnapAxisOptions;

  /**
   * 縦方向（ブロック軸）のオプション
   * - 縦横共通の値を上書きする
   */
  y?: ScrollSnapAxisOptions;
};

/**
 * 軸ごとに指定できるオプション（直下で縦横共通、または `x`・`y` で軸ごとに指定する）
 */
export type ScrollSnapAxisOptions = {
  /**
   * スクロールパディング
   * - `x`: `scroll-padding-inline`（左右）
   * - `y`: `scroll-padding-block`（上下）
   */
  padding?: number | string;

  /**
   * スナップ位置の揃え
   * - `x`: インライン軸
   * - `y`: ブロック軸
   */
  align?: SnapAlign;

  /**
   * スクロールマージン
   * - `x`: `scroll-margin-inline`（左右）
   * - `y`: `scroll-margin-block`（上下）
   */
  margin?: number | string;
};

/**
 * 子要素に適用するオプション
 */
export type ScrollSnapItemOptions = {
  /**
   * スナップ位置の揃え
   * - `'start'`: 先頭に揃える
   * - `'center'`: 中央に揃える
   * - `'end'`: 末尾に揃える
   * - `'none'`: スナップしない
   */
  align?: SnapAlign;

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
