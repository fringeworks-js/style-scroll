import { playwright } from '@vitest/browser-playwright';
import { configDefaults, defineConfig } from 'vitest/config';

/**
 * ブラウザーで実行するテスト（CSS の計算結果を確認する）
 */
const BROWSER_TEST = 'src/**/*.browser.test.ts';

export default defineConfig({
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
