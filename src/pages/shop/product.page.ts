import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ProductPage extends BasePage {
    constructor(page: Page) {
    super(page);
  }

  // ============ LOCATORS ============
  readonly product = {
    summary: this.page.locator('.summary.entry-summary'),
    name: this.page.locator('h1.product_title.entry-title'),
    originalPrice: this.page.locator('.summary.entry-summary del .woocommerce-Price-amount').first(),
    salePrice: this.page.locator('.summary.entry-summary ins .woocommerce-Price-amount').first(),
    description: this.page.locator('.summary.entry-summary .woocommerce-product-details__short-description p')
  }
  readonly review = {
    reviewTab: this.page.locator('a[href="#tab-reviews"]'),
    reviewContent: this.page.locator('#comment').first(),
    reviewerNameInput: this.page.locator('#author'),
    reviewerEmailInput: this.page.locator('#email'),
    submitReviewButton: this.page.getByRole('button', {name: 'submit'}),
    reviewLists: this.page.locator('#comments .commentlist')
  }

  rating(ratingNumber: number): Locator {
    return this.page.locator(`p.stars a.star-${ratingNumber}`);
  }

  // ============ ACTION METHODS ============
  async verifyGoToProductDetail(productName: string){
    await expect(this.page).toHaveTitle(`${productName} – E-commerce site testing`);
  }

  async verifyProductInformation(productInfo: { name: string; originalPrice: string; salePrice: string; description: string}){
    await expect(this.product.name).toHaveText(productInfo.name)
    await expect(this.product.originalPrice).toContainText(productInfo.originalPrice)
    await expect(this.product.salePrice).toContainText(productInfo.salePrice)
    await expect(this.product.description).toContainText(productInfo.description)
  }

  async clickReviewTab(){
    await this.review.reviewTab.click()
  }

  async addAReview(review: { ratingNumber: number; reviewContent: string; reviewerName: string, reviewerEmail: string}){
    await this.rating(review.ratingNumber).click()
    await this.review.reviewContent.fill(review.reviewContent)
    await this.review.reviewerNameInput.fill(review.reviewerName)
    await this.review.reviewerEmailInput.fill(review.reviewerEmail)
  }

  async clickReviewSubmit(){
    await this.review.submitReviewButton.click()
  }

  getReviewByContent(reviewContent: string): Locator {
    return this.review.reviewLists.filter({hasText: reviewContent});
  }

  async verifyReviewPendingApproval(reviewContent: string) {
   await expect(this.getReviewByContent(reviewContent)).toContainText(/awaiting approval/i,)
  }

  async verifyReviewNotVisibleForOtherPage(reviewContent: string){
    await expect(this.getReviewByContent(reviewContent)).toHaveCount(0);
  }
}


