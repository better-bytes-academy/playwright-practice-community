import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

type ReviewInput = {
  rating: number;
  content: string;
  name: string;
  email: string;
};

export class ProductPage extends BasePage {
  readonly productSummary: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productPromotionalPrice: Locator;
  readonly productDescription: Locator;
  readonly reviewsTabLink: Locator;
  readonly reviewList: Locator;
  readonly pendingReviewNotice: Locator;
  readonly reviewContentInput: Locator;
  readonly reviewerNameInput: Locator;
  readonly reviewerEmailInput: Locator;
  readonly submitReviewButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productSummary = page.locator('.summary.entry-summary');
    this.productName = page.getByRole('heading', { level: 1 });
    this.productPrice = page.locator('.summary p.price del .amount');
    this.productPromotionalPrice = page.locator('.summary p.price ins .amount');
    this.productDescription = page.locator('.woocommerce-product-details__short-description p');
    this.reviewsTabLink = page.getByRole('tab', { name: /Reviews/ });
    this.reviewList = page.locator('#comments ol.commentlist');
    this.pendingReviewNotice = page.locator('.woocommerce-review__awaiting-approval');
    this.reviewContentInput = page.getByLabel('Your review');
    this.reviewerNameInput = page.locator('#author');
    this.reviewerEmailInput = page.locator('#email');
    this.submitReviewButton = page.getByRole('button', { name: 'Submit' });
  }

  get productPageLocs() {
    return {
      ratingStar: (stars: number) => this.page.getByRole('radio', { name: `${stars} of 5 stars` }),
    }
  }

  async writeReview({ rating, content, name, email }: ReviewInput): Promise<void> {
    await this.reviewsTabLink.click();
    await this.productPageLocs.ratingStar(rating).click();
    await this.reviewContentInput.fill(content);
    await this.reviewerNameInput.fill(name);
    await this.reviewerEmailInput.fill(email);
    await this.submitReviewButton.click();
  }
}
