import { Locator, Page } from '@playwright/test';
import { BasePage } from '../../pages/base.page';

export class ProductPage extends BasePage {
  readonly productSummary: Locator;

  constructor(page: Page) {
    super(page);
    this.productSummary = page.locator('.summary.entry-summary');
  }
}
