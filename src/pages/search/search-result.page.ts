import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class SearchResultPage extends BasePage {
  readonly productItems: Locator;
  readonly productLinks: Locator;

  constructor(page: Page) {
    super(page);
    this.productItems = page.locator('ul.products li.product');
    this.productLinks = this.productItems.locator('.woocommerce-loop-product__link');
  }

  async getProductCount(): Promise<number> {
    return this.productItems.count();
  }

  async clickProduct(index: number): Promise<void> {
    await this.productLinks.nth(index).click();
  }
}
