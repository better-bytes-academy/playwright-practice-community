import { test as base } from '@playwright/test';
import { HomePage } from '@template/src/pages/home/home.page';

type HomeFixtures = {
  homePage: HomePage;
};

export const test = base.extend<HomeFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
