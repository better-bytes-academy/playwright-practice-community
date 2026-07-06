import { mergeTests } from '@playwright/test';
import { test as homeTest } from './home/home.fixture';
import { test as searchTest } from './search/search.fixture';
import { test as shopTest } from './shop/shop.fixture';

const mergedTest = mergeTests(homeTest, searchTest, shopTest);

// viewport must be null for --start-maximized to actually take effect in --headed mode —
// a fixed viewport makes Playwright force-resize the window, which overrides maximizing it.
// --window-size covers headless runs, which have no real window to maximize.
export const test = mergedTest.extend({
  viewport: null,
  // the chromium project's Desktop Chrome device preset sets deviceScaleFactor, which
  // Playwright rejects when combined with a null viewport — clear it here too.
  deviceScaleFactor: async ({}, use) => {
    await use(undefined);
  },
  launchOptions: async ({ launchOptions }, use) => {
    await use({
      ...launchOptions,
      args: [...(launchOptions.args ?? []), '--start-maximized', '--window-size=1920,1080'],
    });
  },
});

export { expect } from '@playwright/test';
