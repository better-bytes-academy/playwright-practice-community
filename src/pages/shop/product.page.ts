import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ProductPage extends BasePage {
  readonly productSummary: Locator;
  // Product information
  readonly productName: Locator;
  readonly originalPrice: Locator;
  readonly salePrice: Locator;
  readonly productDescription: Locator;
  // Review
  readonly reviewTab: Locator;
  readonly reviewContent: Locator;
  readonly reviewerNameInput: Locator;
  readonly reviewerEmailInput: Locator;
  readonly submitReviewButton: Locator;
  readonly reviewLists: Locator


  constructor(page: Page) {
    super(page);
    this.productSummary = page.locator('.summary.entry-summary');
    // Product information
    this.productName = page.locator('h1.product_title.entry-title');
    this.originalPrice = this.productSummary.locator('del .woocommerce-Price-amount').first();
    this.salePrice = this.productSummary.locator('ins .woocommerce-Price-amount').first();
    this.productDescription = this.productSummary.locator('.woocommerce-product-details__short-description p');
    //Review
    this.reviewTab = page.locator('a[href="#tab-reviews"]');
    this.reviewContent = page.locator('#comment').first();
    this.reviewerNameInput = page.locator('#author')
    this.reviewerEmailInput = page.locator('#email')
    this.submitReviewButton = page.getByRole('button', {name: 'submit'});
    this.reviewLists = this.page.locator('#comments .commentlist');
  }
  rating(ratingNumber: number): Locator {
    return this.page.locator(`p.stars a.star-${ratingNumber}`);
  }

  async verifyGoToProductDetail(productName: string){
    await expect(this.page).toHaveTitle(`${productName} – E-commerce site testing`);
  }

  async verifyProductInformation(productInfor: any){
    await expect(this.productName).toHaveText(productInfor.productName)
    await expect(this.originalPrice).toContainText(productInfor.originalPrice)
    await expect(this.salePrice).toContainText(productInfor.salePrice)
    await expect(this.productDescription).toContainText(productInfor.description)
  }

  async clickReviewTab(){
    await this.reviewTab.click()
  }

  async addAReview(review: any){
    await this.rating(review.rating).click()
    await this.reviewContent.fill(review.reviewContent)
    await this.reviewerNameInput.fill(review.reviewerName)
    await this.reviewerEmailInput.fill(review.reviewerEmail)
  }

  async clickReviewSubmit(){
    await this.submitReviewButton.click()
  }

  getReviewByContent(reviewContent: string): Locator {
    return this.reviewLists.filter({hasText: reviewContent});
  }

  async verifyReviewPendingApproval(reviewContent: string) {
   await expect(this.getReviewByContent(reviewContent)).toContainText(/awaiting approval/i,)
}

  async verifyReviewNotVisibleForOtherPage(reviewContent: string){
    await this.reviewTab.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.getReviewByContent(reviewContent)).toHaveCount(0);
  }
}


