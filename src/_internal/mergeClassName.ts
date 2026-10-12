export default function mergeClassName(
  ...classNames: (string | null | undefined)[]
): string {
  return classNames
    .reduce<string[]>((result, className) => {
      if (className) {
        result.push(className);
      }
      return result;
    }, [])
    .join(' ');
}
