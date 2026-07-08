import { test, expect } from '../../src/fixtures';

test.describe('Sample suite verification', () => {
  test('Home page should display correct title and description', {
    tag: ["@SAMPLE_20260701"]
  }, async ({ homePage }) => {
    console.log()
    await test.step('Open homepage, verify site title and site description is correct', async () => {
      await homePage.goto();
      await expect(homePage.homePageLocs.title("E-commerce site testing")).toBeVisible();
      await expect(homePage.homePageLocs.description('Website thực hành – hoctest.com')).toBeVisible();
    });
  });
});