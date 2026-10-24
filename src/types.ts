import type { StyleResult } from '@fringeworks/style-utils';
import type { LooseDictionary } from '@fringeworks/types';

/**
 * スタイルを作る関数
 */
export type CreateScrollStyle<O = LooseDictionary> = (
  options?: O,
) => ScrollStyle;

/**
 * スタイルを作る関数の戻り値
 */
export type ScrollStyle = StyleResult;
