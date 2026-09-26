import type { ScrollStyle } from '../types';
import mergeClassName from './mergeClassName';

export default function mergeStyleResults(results: ScrollStyle[]): ScrollStyle {
  // 全てのクラス&スタイルを統合
  return results.reduce<ScrollStyle>((styleResult, result) => {
    if (result.className) {
      styleResult.className = mergeClassName(
        styleResult.className,
        result.className,
      );
    }
    if (result.style) {
      styleResult.style = { ...styleResult.style, ...result.style };
    }
    return styleResult;
  }, {} satisfies ScrollStyle);
}
