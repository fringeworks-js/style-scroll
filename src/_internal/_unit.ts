/**
 * valueが数値の場合、単位を付与して文字列に変換する
 * それ以外はそのまま返す
 * @param value
 * @param unit
 * @returns
 */
export default function unit(value: string | number, unit?: string): string;
export default function unit(
  value: string | number | null | undefined,
  unit?: string,
): string | null | undefined;
export default function unit(
  value: string | number | null | undefined,
  unit: string = 'px',
): string | null | undefined {
  if (typeof value === 'number') {
    return `${value}${unit}`;
  } else {
    return value;
  }
}
