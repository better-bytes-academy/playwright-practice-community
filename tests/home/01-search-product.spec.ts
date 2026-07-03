import { test, expect } from '@fixtures';

test.describe('Home page search function', () => {
  test('HOME_20260701 - Search product with keyword "ISTQB"', {
    tag: ["@HOME_20260701"]
  }, async ({ page, homePage, searchResultPage, productPage }) => {
    const testData = {
      keyword: 'ISTQB',
      numProduct: 5
    }

    await test.step('Search "ISTQB" from home page search bar with default category', async () => {
      await homePage.goto();
      await homePage.searchProduct(testData.keyword);
      await expect(page).toHaveURL(new RegExp(`\\?post_type=product&s=${testData.keyword}&product_cat=`));
    });

    const productCount = await searchResultPage.getProductCount();
    expect(productCount).toBe(testData.numProduct);
    for (let i = 0; i < productCount; i++) {
      await test.step(`Open product #${i + 1} and verify title or description contains "${testData.keyword}"`, async () => {
        await searchResultPage.clickProduct(i);
        await expect(productPage.productSummary).toContainText(testData.keyword);
        await page.goBack();
        await expect(searchResultPage.productItems.first()).toBeVisible();
      });
    }
  });
});
