import mergeClassName from '../_internal/mergeClassName';
import unit from '../_internal/unit';
import type { CreateScrollStyle, ScrollStyle } from '../types';
import type { ItemValues } from './_applyItemOptions';
import { applyItemOptions } from './_applyItemOptions';
import {
  clsScrollScrollSnap,
  clsScrollScrollSnapItem,
  clsScrollSnapPadding,
  clsScrollSnapPaddingX,
  clsScrollSnapPaddingY,
  varScrollSnapBehavior,
  varScrollSnapPadding,
  varScrollSnapPaddingX,
  varScrollSnapPaddingY,
  varScrollSnapType,
} from './_constants';
import type { ScrollSnapOptions } from './types';

/**
 * scrollSnapスタイル（コンテナ側）
 *
 * - scroll-snap-type: スクロールスナップの軸と厳密さ
 * - scroll-padding: スナップ位置のオフセット（固定ヘッダー対応など）
 * - scroll-behavior: スクロール動作
 * - align / stop / margin など: 直接の子要素（`> *`）に一括適用
 *
 * @example
 * // 子要素に一括適用
 * scrollSnap({ axis: 'y', align: 'start' })
 *
 * // 横方向スナップ（カルーセル）
 * scrollSnap({ axis: 'x', strictness: 'proximity' })
 *
 * // 固定ヘッダー対応
 * scrollSnap({ axis: 'y', y: { padding: 80 } })
 */
const scrollSnap: CreateScrollStyle<ScrollSnapOptions> = (options = {}) => {
  const {
    axis,
    strictness = 'mandatory',
    padding,
    behavior,
    align,
    stop,
    margin,
    x = {},
    y = {},
  } = options;
  const { padding: paddingX, align: alignX, margin: marginX } = x;
  const { padding: paddingY, align: alignY, margin: marginY } = y;

  const result: ScrollStyle = {
    className: clsScrollScrollSnap,
    style: {},
  };

  // scroll-snap-type
  if (axis != null) {
    result.style![varScrollSnapType] =
      axis === 'none' ? 'none' : `${axis} ${strictness}`;
  }

  // scroll-behavior
  if (behavior != null) {
    result.style![varScrollSnapBehavior] = behavior;
  }

  // scroll-padding
  if (padding != null) {
    result.className = mergeClassName(result.className, clsScrollSnapPadding);
    result.style![varScrollSnapPadding] = unit(padding) as string;
  }
  if (paddingX != null) {
    result.className = mergeClassName(result.className, clsScrollSnapPaddingX);
    result.style![varScrollSnapPaddingX] = unit(paddingX) as string;
  }
  if (paddingY != null) {
    result.className = mergeClassName(result.className, clsScrollSnapPaddingY);
    result.style![varScrollSnapPaddingY] = unit(paddingY) as string;
  }

  // アイテムオプションが1つでも指定されていれば > * に一括適用
  const itemOptions: ItemValues = {
    align,
    alignX,
    alignY,
    stop,
    margin,
    marginX,
    marginY,
  };
  if (Object.values(itemOptions).some((v) => v != null)) {
    result.className = mergeClassName(
      result.className,
      clsScrollScrollSnapItem,
    );
    applyItemOptions(result, itemOptions);
  }

  return result;
};
export default scrollSnap;
