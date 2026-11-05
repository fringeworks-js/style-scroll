import { playwright } from '@vitest/browser-playwright';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig } from 'vitest/config';

/**
 * ブラウザーで実行するテスト（CSS の計算結果を確認する）
 */
const BROWSER_TEST = 'src/**/*.browser.test.ts';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// ブラウザーのテストでカバレッジを取るときに、ブラウザーが読み込む coverage-v8 の場所。
// パッケージにも pnpm-workspace.yaml があるので、Vite はパッケージのフォルダーをルートとみなし、
// ワークスペースのルートの node_modules にあるこのファイルを読める範囲（server.fs.allow）から外してしまう
const coverageDir = path.dirname(
  createRequire(import.meta.url).resolve('@vitest/coverage-v8/package.json'),
);

export default defineConfig({
  server: { fs: { allow: [dirname, coverageDir] } },
  test: {
    globals: true,
    coverage: { enabled: true },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          exclude: [
            ...configDefaults.exclude,
            '**/*.e2e.spec.ts',
            BROWSER_TEST,
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          include: [BROWSER_TEST],
          browser: {
            enabled: true,
            headless: true,
            // headless の Chromium は既定でスクロールバーを隠すため、表示させる
            provider: playwright({
              launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] },
            }),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
