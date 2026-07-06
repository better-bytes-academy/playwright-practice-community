import { test, expect } from '@fixtures';
import { ProductPage } from '@pages/shop/product.page';

test.describe('Product review function', () => {
  test('PRODUCT_20260704 - Review sản phẩm', {
    tag: ["@PRODUCT_20260704"]
  }, async ({ page, browser, homePage, searchResultPage, productPage }) => {
    // WordPress rejects resubmitting identical comment text site-wide, so a random
    // suffix keeps the content unique across repeated runs of this test.
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const testData = {
      productName: 'ISTQB Certified Tester Finance Testing (CT-FT) Tiếng Việt',
      price: '399.000 $',
      promotionalPrice: '279.000 $',
      description: 'Chinh phục chứng chỉ ISTQB® CT-FT và làm chủ kỹ năng kiểm thử phần mềm tài chính chuyên nghiệp.',
      review: {
        rating: 5,
        content: `Review Playwright Việt Nam community: Truy cập khuyenmai.hoctest.com để lấy các ưu đãi ${randomSuffix}`,
        name: 'phuctien1909',
        email: 'phuctien1909@hoctest.com'
      }
    };
    let productUrl = '';

    await test.step('Tìm kiếm và click vào sản phẩm, verify thông tin chi tiết sản phẩm', async () => {
      await homePage.goto();
      await homePage.searchProduct('ISTQB');
      await searchResultPage.productLinks.filter({ hasText: testData.productName }).click();
      productUrl = page.url();

      await expect(productPage.productName).toHaveText(testData.productName);
      await expect(productPage.productPrice).toHaveText(testData.price);
      await expect(productPage.productPromotionalPrice).toHaveText(testData.promotionalPrice);
      await expect(productPage.productDescription).toHaveText(testData.description);
    });

    await test.step('Viết review mới, verify review được submit với trạng thái awaiting approval', async () => {
      await productPage.writeReview(testData.review);
      await expect(productPage.pendingReviewNotice).toBeVisible();
      await expect(productPage.reviewList).toContainText(testData.review.content);
    });

    await test.step('Refresh lại trang, verify comment vẫn ở trạng thái awaiting approval', async () => {
      await page.reload();
      await expect(productPage.pendingReviewNotice).toBeVisible();
    });

    await test.step('Mở context mới độc lập, verify comment không hiển thị ở danh sách comment', async () => {
      const newContext = await browser.newContext();
      const newProductPage = new ProductPage(await newContext.newPage());
      await newProductPage.navigate(productUrl);

      await expect(newProductPage.reviewList).not.toContainText(testData.review.content);
      await newContext.close();
    });
  });
});
