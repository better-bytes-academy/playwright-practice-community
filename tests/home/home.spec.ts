import { test, expect } from '@fixtures/home/home.fixture';

test.describe('Home Page Verification', () => {
  test('should verify home page title and description', async ({ homePage }) => {
    // 1. Goto home page
    await homePage.goto();

    // 2. Verify H1 site title text
    await expect(homePage.siteTitle).toHaveText('E-commerce site testing');

    // 2b. Verify H1 site title link points to the home page URL
    await expect(homePage.siteTitle.locator('a')).toHaveAttribute(
      'href',
      'https://e-commerce-dev.betterbytesvn.com/'
    );

    // 3. Verify site description contains the expected text
    await expect(homePage.siteDescription).toContainText(
      'Website thực hành – hoctest.com'
    );
  });
});
