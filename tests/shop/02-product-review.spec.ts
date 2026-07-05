import { test, expect} from '@fixtures';
import { PRODUCT_REVIEW_DATA } from '@/data/product-review.data';
import { HomePage } from '@pages/home/home.page';
import { ProductPage } from '@pages/shop/product.page';


test.describe('Review product function', () => {
  test('HOME_20260704 - Review sản phẩm', {tag: ["@HOME_20260704"]}, async ({ page, browser, homePage, productPage }) => {
    await test.step('Search product', async () => {
      await homePage.goto();
      await homePage.searchProduct(PRODUCT_REVIEW_DATA.productInfor.name);
    });
    await test.step('Redirect to product detail & verify product information', async() => {
      await productPage.verifyGoToProductDetail(PRODUCT_REVIEW_DATA.productInfor.name);
      await productPage.verifyProductInformation({
        productName: PRODUCT_REVIEW_DATA.productInfor.name,
        originalPrice: PRODUCT_REVIEW_DATA.productInfor.originalPrice,
        salePrice: PRODUCT_REVIEW_DATA.productInfor.salePrice,
        description: PRODUCT_REVIEW_DATA.productInfor.description
      });
    });
    await test.step('Add a review', async() => {
      await productPage.clickReviewTab();
      await productPage.addAReview({
        rating: PRODUCT_REVIEW_DATA.review.ratingNumber,
        reviewContent: PRODUCT_REVIEW_DATA.review.reviewContent,
        reviewerName: PRODUCT_REVIEW_DATA.review.reviewerName,
        reviewerEmail: PRODUCT_REVIEW_DATA.review.reviewerEmail
      });
      await productPage.clickReviewSubmit();
      await productPage.verifyReviewPendingApproval(PRODUCT_REVIEW_DATA.review.reviewContent);
    });
    await test.step('Verify review has awaiting approval after refresh paege', async() => {
      await page.reload({waitUntil: 'domcontentloaded'});
      await productPage.verifyReviewPendingApproval(PRODUCT_REVIEW_DATA.review.reviewContent);
    });
    await test.step('Verify review is hidden in another browser', async() => {
      const guestContext = await browser.newContext();
      try {
        const guestPage = await guestContext.newPage();
        const guestHomePage = new HomePage(guestPage);
        const guestProductPage = new ProductPage(guestPage);
        await guestHomePage.goto();
        await guestHomePage.searchProduct(PRODUCT_REVIEW_DATA.productInfor.name);
        await guestProductPage.verifyGoToProductDetail(PRODUCT_REVIEW_DATA.productInfor.name);
        await guestProductPage.clickReviewTab();
        await guestProductPage.verifyReviewNotVisibleForOtherPage(PRODUCT_REVIEW_DATA.review.reviewContent);
      } finally {
        await guestContext.close();
      }
    });
  });
});
