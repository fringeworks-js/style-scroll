import type { StyleStateRecord } from '@niche-works/style-utils';
import { clsScrollScrollbar } from '../_constants';
import mergeClassName from '../_internal/mergeClassName';
import resolveStyleStateXY from '../_internal/resolveStyleStateXY';
import unit from '../_internal/unit';
import type { CreateScrollStyle, ScrollStyle } from '../types';
import {
  clsScrollbarAnimationColor,
  clsScrollbarAnimationSize,
  clsScrollbarArrowsFalse,
  clsScrollbarArrowsTrue,
  clsScrollbarThumbBorderWidthXAuto,
  clsScrollbarThumbBorderWidthYAuto,
  clsScrollbarTrackSizeXAuto,
  clsScrollbarTrackSizeYAuto,
  thumbStates,
  trackStates,
  varScrollbarFallbackSize,
  varScrollbarThumbBorderColor,
  varScrollbarThumbBorderWidth,
  varScrollbarThumbColor,
  varScrollbarThumbRadius,
  varScrollbarThumbSize,
  varScrollbarTrackColor,
  varScrollbarTrackSize,
} from './_constants';
import type { ScrollbarOptions } from './types';

/**
 * scrollbarスタイル
 *
 * - スクロールバーの見た目のカスタマイズ
 */
const scrollbar: CreateScrollStyle<ScrollbarOptions> = (options = {}) => {
  const {
    thumbColor,
    thumbColorX,
    thumbColorY,
    thumbSize,
    thumbSizeX,
    thumbSizeY,
    thumbRadius,
    thumbRadiusX,
    thumbRadiusY,
    thumbBorderColor,
    thumbBorderColorX,
    thumbBorderColorY,
    thumbBorderWidth,
    thumbBorderWidthX,
    thumbBorderWidthY,
    trackColor,
    trackColorX,
    trackColorY,
    trackSize,
    trackSizeX,
    trackSizeY,
    fallbackSize,
    arrows,
    noAnimation,
  } = options;

  const result: ScrollStyle = {
    className: clsScrollScrollbar,
    style: {},
  };

  // thumbSize
  const resolvedThumbSize = resolveStyleStateXY(
    thumbSize,
    thumbSizeX,
    thumbSizeY,
    thumbStates,
  );
  _applyPxStylesXY(result, varScrollbarThumbSize, resolvedThumbSize);

  // thumbColor
  const resolvedThumbColor = resolveStyleStateXY(
    thumbColor,
    thumbColorX,
    thumbColorY,
    thumbStates,
  );
  _applyStylesXY(result, varScrollbarThumbColor, resolvedThumbColor);

  // thumbRadius
  const resolvedThumbRadius = resolveStyleStateXY(
    thumbRadius,
    thumbRadiusX,
    thumbRadiusY,
    thumbStates,
  );
  _applyRadiusStylesXY(result, varScrollbarThumbRadius, resolvedThumbRadius);

  // thumbBorderWidth
  const resolvedThumbBorderWidth = resolveStyleStateXY(
    thumbBorderWidth,
    thumbBorderWidthX,
    thumbBorderWidthY,
    thumbStates,
  );
  _applyPxStylesXY(
    result,
    varScrollbarThumbBorderWidth,
    resolvedThumbBorderWidth,
  );

  // thumbBorderColor
  const resolvedThumbBorderColor = resolveStyleStateXY(
    thumbBorderColor,
    thumbBorderColorX,
    thumbBorderColorY,
    thumbStates,
  );
  _applyStylesXY(
    result,
    varScrollbarThumbBorderColor,
    resolvedThumbBorderColor,
  );

  // trackColor
  const resolvedTrackColor = resolveStyleStateXY(
    trackColor,
    trackColorX,
    trackColorY,
    trackStates,
  );
  _applyStylesXY(result, varScrollbarTrackColor, resolvedTrackColor);

  // trackSize
  const resolvedTrackSize = resolveStyleStateXY(
    trackSize,
    trackSizeX,
    trackSizeY,
    trackStates,
  );
  _applyPxStylesXY(result, varScrollbarTrackSize, resolvedTrackSize);

  // fallbackSize
  _applyStyle(result, varScrollbarFallbackSize, fallbackSize);

  // arrows
  if (arrows !== undefined) {
    result.className = mergeClassName(
      result.className,
      arrows ? clsScrollbarArrowsTrue : clsScrollbarArrowsFalse,
    );
  }

  // noAnimation → transition クラス（noAnimation の反転でクラスを付与）
  const noSize =
    noAnimation === true ||
    (typeof noAnimation === 'object' && !!noAnimation?.size);
  const noColor =
    noAnimation === true ||
    (typeof noAnimation === 'object' && !!noAnimation?.color);
  if (!noSize) {
    result.className = mergeClassName(
      result.className,
      clsScrollbarAnimationSize,
    );
  }
  if (!noColor) {
    result.className = mergeClassName(
      result.className,
      clsScrollbarAnimationColor,
    );
  }

  // autoの設定
  _applyThumbSizeAuto(
    result,
    resolvedThumbBorderWidth.x.base,
    clsScrollbarThumbBorderWidthXAuto,
  );
  _applyThumbSizeAuto(
    result,
    resolvedThumbBorderWidth.y.base,
    clsScrollbarThumbBorderWidthYAuto,
  );
  _applyTrackSizeAuto(
    result,
    resolvedTrackSize.x.base,
    clsScrollbarTrackSizeXAuto,
  );
  _applyTrackSizeAuto(
    result,
    resolvedTrackSize.y.base,
    clsScrollbarTrackSizeYAuto,
  );

  return result;
};
export default scrollbar;

function _applyStylesXY<T, S extends string>(
  result: ScrollStyle,
  keys: Record<'x' | 'y', Record<S, string>>,
  records: Record<'x' | 'y', StyleStateRecord<T, S>>,
) {
  _applyXY(result, keys, records, _applyStyle);
}

function _applyStyle(result: ScrollStyle, key: string, value: unknown) {
  if (_hasValidValue(value)) {
    result.style[key] = value;
  }
}

function _applyPxStylesXY<T, S extends string>(
  result: ScrollStyle,
  keys: Record<'x' | 'y', Record<S, string>>,
  records: Record<'x' | 'y', StyleStateRecord<T, S>>,
) {
  _applyXY(result, keys, records, _applyPxStyle);
}

function _applyPxStyle(
  result: ScrollStyle,
  key: string,
  value: number | string | null | undefined,
): void {
  if (_hasValidValue(value)) {
    result.style[key] = unit(value);
  }
}

function _applyRadiusStylesXY<T, S extends string>(
  result: ScrollStyle,
  keys: Record<'x' | 'y', Record<S, string>>,
  records: Record<'x' | 'y', StyleStateRecord<T, S>>,
) {
  _applyXY(result, keys, records, _applyRadiusStyle);
}

function _applyRadiusStyle(
  result: ScrollStyle,
  key: string,
  value: number | string | null | undefined,
) {
  if (_hasValidValue(value)) {
    let radius: string;
    if (value === 'full') {
      radius = '9999px';
    } else if (value === 'none') {
      radius = '0';
    } else {
      radius = unit(value as number);
    }
    result.style[key] = radius;
  }
}

function _applyXY<T, S extends string>(
  result: ScrollStyle,
  keys: Record<'x' | 'y', Record<S, string>>,
  records: Record<'x' | 'y', StyleStateRecord<T, S>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyFn: (result: ScrollStyle, key: string, value: any) => void,
) {
  for (const state in records.x) {
    applyFn(result, keys.x[state], records.x[state]);
  }
  for (const state in records.y) {
    applyFn(result, keys.y[state], records.y[state]);
  }
}

function _hasValidValue(value: unknown) {
  return value !== null && value !== undefined && value !== '';
}

function _applyThumbSizeAuto(
  result: ScrollStyle,
  value: unknown,
  className: string,
) {
  if (value == null || value === 'auto') {
    result.className = mergeClassName(result.className, className);
  }
}

function _applyTrackSizeAuto(
  result: ScrollStyle,
  value: unknown,
  className: string,
) {
  if (value === 'auto') {
    result.className = mergeClassName(result.className, className);
  }
}
