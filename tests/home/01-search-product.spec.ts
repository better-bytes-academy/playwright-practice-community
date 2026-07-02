import { test, expect } from '@fixtures';

test.describe('Home page search function', () => {
  test('HOME_20260701 - Search product with keyword "ISTQB"', {
    tag: ["@HOME_20260701"]
  }, async ({ page, homePage, searchResultPage, productPage }) => {
    const keyword = 'ISTQB';

    await test.step('Search "ISTQB" from home page search bar with default category', async () => {
      await homePage.goto();
      await homePage.searchProduct(keyword);
      await expect(page).toHaveURL(/\?post_type=product&s=ISTQB&product_cat=/);
      await expect(searchResultPage.productItems).toHaveCount(5);
    });

    const productCount = await searchResultPage.getProductCount();
    for (let i = 0; i < productCount; i++) {
      await test.step(`Open product #${i + 1} and verify title or description contains "${keyword}"`, async () => {
        await searchResultPage.clickProduct(i);
        await expect.soft(productPage.productSummary).toContainText(keyword);
        await page.goBack();
      });
    }
  });
});
