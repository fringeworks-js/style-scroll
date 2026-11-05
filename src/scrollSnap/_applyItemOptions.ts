import mergeClassName from '../_internal/_mergeClassName';
import unit from '../_internal/_unit';
import type { ScrollStyle } from '../types';
import {
  clsScrollSnapItemAlign,
  clsScrollSnapItemMargin,
  clsScrollSnapItemMarginX,
  clsScrollSnapItemMarginY,
  clsScrollSnapItemStop,
  varScrollSnapItemAlign,
  varScrollSnapItemMargin,
  varScrollSnapItemMarginX,
  varScrollSnapItemMarginY,
  varScrollSnapItemStop,
} from './_constants';
import type { SnapAlign, SnapStop } from './types';

/**
 * 子要素に適用する値（軸別の値は共通の値と分けて保持する）
 */
export type ItemValues = {
  align?: SnapAlign;
  alignX?: SnapAlign;
  alignY?: SnapAlign;
  stop?: SnapStop;
  margin?: number | string;
  marginX?: number | string;
  marginY?: number | string;
};

/**
 * 子要素に適用する値を設定する
 *
 * 指定した値ごとにクラスを付与し、指定していないプロパティは子要素に適用しない
 */
export function applyItemOptions(
  result: ScrollStyle,
  options: ItemValues,
): void {
  const { align, alignX, alignY, stop, margin, marginX, marginY } = options;

  const snapAlign = resolveSnapAlign(align, alignX, alignY);
  if (snapAlign != null) {
    _apply(result, clsScrollSnapItemAlign, varScrollSnapItemAlign, snapAlign);
  }
  if (stop != null) {
    _apply(result, clsScrollSnapItemStop, varScrollSnapItemStop, stop);
  }
  if (margin != null) {
    _apply(
      result,
      clsScrollSnapItemMargin,
      varScrollSnapItemMargin,
      unit(margin),
    );
  }
  if (marginX != null) {
    _apply(
      result,
      clsScrollSnapItemMarginX,
      varScrollSnapItemMarginX,
      unit(marginX),
    );
  }
  if (marginY != null) {
    _apply(
      result,
      clsScrollSnapItemMarginY,
      varScrollSnapItemMarginY,
      unit(marginY),
    );
  }
}

/**
 * alignX（インライン軸）とalignY（ブロック軸）からscroll-snap-alignの値を解決する。
 * CSS仕様: scroll-snap-align の2値形式は `<block> <inline>` の順（ブロック→インライン）。
 */
export function resolveSnapAlign(
  align: SnapAlign | undefined,
  alignX: SnapAlign | undefined,
  alignY: SnapAlign | undefined,
): string | undefined {
  const resolvedY = alignY ?? align;
  const resolvedX = alignX ?? align;

  if (resolvedY == null && resolvedX == null) {
    return undefined;
  }
  if (resolvedY === resolvedX) {
    return resolvedY ?? 'none';
  }
  return `${resolvedY ?? 'none'} ${resolvedX ?? 'none'}`;
}

function _apply(
  result: ScrollStyle,
  className: string,
  key: `--${string}`,
  value: string,
): void {
  result.className = mergeClassName(result.className, className);
  result.style![key] = value;
}
