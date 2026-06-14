import type { StyleResult } from '@niche-works/style-utils';
import type { LooseDictionary } from '@niche-works/types';

/**
 * スタイルを作る関数
 */
export type CreateScrollStyle<O = LooseDictionary> = (
  options?: O,
) => ScrollStyle;

/**
 * レイアウト
 */
export type ScrollStyle = StyleResult;
