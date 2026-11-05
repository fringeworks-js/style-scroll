import type { StyleState, StyleStateRecord } from '@fringeworks/style-utils';
import { fillStyleState, resolveXY } from '@fringeworks/style-utils';
import { clsScrollScrollbar } from '../_constants';
import mergeClassName from '../_internal/_mergeClassName';
import resolveStyleStateXY from '../_internal/_resolveStyleStateXY';
import unit from '../_internal/_unit';
import type { CreateScrollStyle, ScrollStyle } from '../types';
import {
  clsScrollbarAnimation,
  clsScrollbarArrows,
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
import type { ScrollbarOptions, TrackState } from './types';

/**
 * scrollbarスタイル
 *
 * - スクロールバーの見た目のカスタマイズ
 */
const scrollbar: CreateScrollStyle<ScrollbarOptions> = (options = {}) => {
  const {
    thumbColor,
    thumbSize,
    thumbRadius,
    thumbBorderColor,
    thumbBorderWidth,
    trackColor,
    trackSize,
    x = {},
    y = {},
    fallbackSize,
    arrows = false,
    noAnimation = false,
  } = options;

  const result: ScrollStyle = {
    className: clsScrollScrollbar,
    style: {},
  };

  // thumbSize
  _applyXY(
    result,
    varScrollbarThumbSize,
    resolveStyleStateXY(thumbSize, x.thumbSize, y.thumbSize, thumbStates),
    _toPx,
  );

  // thumbColor
  _applyXY(
    result,
    varScrollbarThumbColor,
    resolveStyleStateXY(thumbColor, x.thumbColor, y.thumbColor, thumbStates),
    _toString,
  );

  // thumbRadius
  _applyXY(
    result,
    varScrollbarThumbRadius,
    resolveStyleStateXY(thumbRadius, x.thumbRadius, y.thumbRadius, thumbStates),
    _toRadius,
  );

  // thumbBorderWidth
  _applyXY(
    result,
    varScrollbarThumbBorderWidth,
    resolveStyleStateXY(
      thumbBorderWidth,
      x.thumbBorderWidth,
      y.thumbBorderWidth,
      trackStates,
    ),
    _toPx,
  );

  // thumbBorderColor
  _applyXY(
    result,
    varScrollbarThumbBorderColor,
    resolveStyleStateXY(
      thumbBorderColor,
      x.thumbBorderColor,
      y.thumbBorderColor,
      thumbStates,
    ),
    _toString,
  );

  // trackColor
  _applyXY(
    result,
    varScrollbarTrackColor,
    resolveStyleStateXY(trackColor, x.trackColor, y.trackColor, trackStates),
    _toString,
  );

  // trackSize
  const resolvedTrackSize = resolveXY(trackSize, x.trackSize, y.trackSize);
  _applyTrackSize(
    result,
    varScrollbarTrackSize.x,
    clsScrollbarTrackSizeXAuto,
    resolvedTrackSize.x,
    trackSize,
  );
  _applyTrackSize(
    result,
    varScrollbarTrackSize.y,
    clsScrollbarTrackSizeYAuto,
    resolvedTrackSize.y,
    trackSize,
  );

  // fallbackSize
  if (fallbackSize !== undefined) {
    _setStyle(result, varScrollbarFallbackSize, fallbackSize);
  }

  // arrows
  if (arrows) {
    _addClassName(result, clsScrollbarArrows);
  }

  // noAnimation
  if (!noAnimation) {
    _addClassName(result, clsScrollbarAnimation);
  }

  return result;
};
export default scrollbar;

/**
 * X軸・Y軸のステートごとの値を、変換してCSS変数に設定する
 */
function _applyXY<T, S extends string>(
  result: ScrollStyle,
  keys: Record<'x' | 'y', Record<'base' | S, string>>,
  records: Record<'x' | 'y', StyleStateRecord<T, S>>,
  toValue: (value: T) => string,
): void {
  for (const axis of ['x', 'y'] as const) {
    _applyRecord(result, keys[axis], records[axis], toValue);
  }
}

/**
 * ステートごとの値を、変換してCSS変数に設定する
 */
function _applyRecord<T, S extends string>(
  result: ScrollStyle,
  keys: Record<'base' | S, string>,
  record: StyleStateRecord<T, S>,
  toValue: (value: T) => string,
): void {
  for (const [state, value] of Object.entries(record) as [
    'base' | S,
    T | undefined,
  ][]) {
    if (value !== undefined && value !== null && value !== '') {
      _setStyle(result, keys[state], toValue(value));
    }
  }
}

/**
 * 1軸分のトラックの幅を設定する
 * - `'auto'` の場合はクラスを付与し、CSS変数は設定しない
 * - 軸別の値で省略したステートは、共通の値（`'auto'` 以外）で補う
 */
function _applyTrackSize(
  result: ScrollStyle,
  keys: Record<'base' | TrackState, string>,
  autoClassName: string,
  value: StyleState<number, TrackState> | 'auto' | undefined,
  common: StyleState<number, TrackState> | 'auto' | undefined,
): void {
  if (value === 'auto') {
    _addClassName(result, autoClassName);
    return;
  }
  const record = fillStyleState(
    value,
    trackStates,
    common === 'auto' ? undefined : common,
  );
  _applyRecord(result, keys, record, _toPx);
}

function _toString(value: string): string {
  return value;
}

function _toPx(value: number): string {
  return unit(value);
}

function _toRadius(value: number | string): string {
  if (value === 'full') {
    return '9999px';
  } else if (value === 'none') {
    return '0';
  } else {
    return unit(value);
  }
}

function _addClassName(result: ScrollStyle, className: string): void {
  result.className = mergeClassName(result.className, className);
}

/**
 * CSS変数などのスタイルを設定する\
 * result.style は scrollbar の中で作成済みのものを使う
 */
function _setStyle(result: ScrollStyle, key: string, value: string): void {
  (result.style as Record<string, string>)[key] = value;
}
