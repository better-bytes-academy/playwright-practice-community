import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export type ProductData = {
  name: string;
  originalPrice: string;
  salePrice: string;
  description: string;
};

export type ReviewData = {
  ratingNumber: number;
  reviewContent: string;
  reviewerName: string;
  reviewerEmail: string;
};

export class ProductPage extends BasePage {
    constructor(page: Page) {
    super(page);
  }

  // ============ LOCATORS ============
  readonly product = {
    summary: this.page.locator('.summary.entry-summary'),
    name: this.page.getByRole('heading', { level: 1 }),
    originalPrice: this.page.locator('.summary.entry-summary del .woocommerce-Price-amount'),
    salePrice: this.page.locator('.summary.entry-summary ins .woocommerce-Price-amount'),
    description: this.page.locator('.summary.entry-summary .woocommerce-product-details__short-description p')
  }
  readonly review = {
    reviewTab: this.page.getByRole('tab', {name: /Review/i}),
    reviewContent: this.page.getByLabel('Your review'),
    reviewerNameInput: this.page.getByRole('textbox', { name: /Name/i }),
    reviewerEmailInput: this.page.getByRole('textbox', { name: /Email/i}),
    submitReviewButton: this.page.getByRole('button', {name: 'submit'}),
    reviewLists: this.page.locator('#comments .commentlist')
  }

  rating(ratingNumber: number): Locator {
    return this.page.locator(`p.stars a.star-${ratingNumber}`);
  }

  // ============ ACTION METHODS ============

  async verifyProductInformation(productInfo: ProductData){
    await expect(this.product.name).toHaveText(productInfo.name)
    await expect(this.product.originalPrice).toContainText(productInfo.originalPrice)
    await expect(this.product.salePrice).toContainText(productInfo.salePrice)
    await expect(this.product.description).toContainText(productInfo.description)
  }

  async clickReviewTab(){
    await this.review.reviewTab.click()
  }

  async addAReview(review: ReviewData){
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


