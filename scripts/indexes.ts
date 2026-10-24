import { CONSTANTS, PRIVATE, TEST_FILE } from '@fringeworks/dev';
import generateIndexFiles from '@fringeworks/dev/generateIndexFiles';

/**
 * with-css の index ファイル
 */
const WITH_CSS_INDEX = 'src/with-css/index.ts';

generateIndexFiles({
  exclude: [
    CONSTANTS,
    PRIVATE,
    TEST_FILE,
    {
      valueType: 'path',
      conditions: 'src/css',
    },
    // with-css は CSS を読み込むため、ルートからは export しない（`./with-css` から読み込む）
    {
      valueType: 'path',
      conditions: /^src\/with-css$/,
    },
  ],
  // with-css からも共通の型を読み込めるようにする
  transform: (exports, { indexPath }) => {
    if (indexPath !== WITH_CSS_INDEX) {
      return exports;
    }
    // 副作用のための import の後に置く
    const imports = exports.filter((line) => line.startsWith('import '));
    const rest = exports.filter((line) => !line.startsWith('import '));
    return [...imports, "export type * from '../types';", ...rest];
  },
});
