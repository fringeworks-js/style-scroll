import type { CreateScrollStyle, ScrollStyle } from '../types';
import { applyItemOptions } from './_applyItemOptions';
import { clsScrollScrollSnapItem } from './_constants';
import type { ScrollSnapItemOptions } from './types';

/**
 * scrollSnapItemスタイル（子要素側）
 *
 * - scroll-snap-align: スナップ位置の揃え
 * - scroll-snap-stop: スナップポイントの通過制御
 * - scroll-margin: スナップ位置のオフセット
 *
 * @example
 * // 先頭揃え（最も一般的）
 * scrollSnapItem({ align: 'start' })
 *
 * // 中央揃え
 * scrollSnapItem({ align: 'center' })
 *
 * // 必ず停止（飛ばしを防ぐ）
 * scrollSnapItem({ align: 'start', stop: 'always' })
 *
 * // マージン付き
 * scrollSnapItem({ align: 'start', marginY: 16 })
 */
const scrollSnapItem: CreateScrollStyle<ScrollSnapItemOptions> = (
  options = {},
) => {
  const result: ScrollStyle = {
    className: clsScrollScrollSnapItem,
    style: {},
  };
  applyItemOptions(result, options);
  return result;
};
export default scrollSnapItem;
