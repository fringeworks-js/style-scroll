import type { StyleState, StyleStateRecord } from '@niche-works/style-utils';
import { fillStyleState, resolveXY } from '@niche-works/style-utils';

/**
 * StyleState を持つ共通値・X値・Y値から、X軸とY軸の base/hover/active 値を確定する。
 * 各ステートは独立してフォールバックする：
 * 軸別の値が未指定なら共通の値を使用する。
 */
export default function resolveStyleStateXY<T, S extends string>(
  common: StyleState<T, S> | undefined,
  x: StyleState<T, S> | undefined,
  y: StyleState<T, S> | undefined,
  states: readonly S[],
): {
  x: StyleStateRecord<T, S>;
  y: StyleStateRecord<T, S>;
} {
  const { x: resolvedX, y: resolvedY } = resolveXY(common, x, y);
  const filledX = fillStyleState(resolvedX, states, common);
  const filledY = fillStyleState(resolvedY, states, common);

  return {
    x: filledX,
    y: filledY,
  };
}
