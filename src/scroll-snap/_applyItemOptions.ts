import mergeClassName from '../_internal/mergeClassName';
import unit from '../_internal/unit';
import type { ScrollStyle } from '../types';
import {
  clsScrollSnapItemMargin,
  clsScrollSnapItemMarginX,
  clsScrollSnapItemMarginY,
  varScrollSnapItemAlign,
  varScrollSnapItemMargin,
  varScrollSnapItemMarginX,
  varScrollSnapItemMarginY,
  varScrollSnapItemStop,
} from './_constants';
import type { ScrollSnapItemOptions, SnapAlign } from './types';

export function applyItemOptions(
  result: ScrollStyle,
  options: ScrollSnapItemOptions,
): void {
  const { align, alignX, alignY, stop, margin, marginX, marginY } = options;

  const snapAlign = resolveSnapAlign(align, alignX, alignY);
  if (snapAlign != null) {
    result.style![varScrollSnapItemAlign] = snapAlign;
  }
  if (stop != null) {
    result.style![varScrollSnapItemStop] = stop;
  }
  if (margin != null) {
    result.className = mergeClassName(result.className, clsScrollSnapItemMargin);
    result.style![varScrollSnapItemMargin] = unit(margin) as string;
  }
  if (marginX != null) {
    result.className = mergeClassName(
      result.className,
      clsScrollSnapItemMarginX,
    );
    result.style![varScrollSnapItemMarginX] = unit(marginX) as string;
  }
  if (marginY != null) {
    result.className = mergeClassName(
      result.className,
      clsScrollSnapItemMarginY,
    );
    result.style![varScrollSnapItemMarginY] = unit(marginY) as string;
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
