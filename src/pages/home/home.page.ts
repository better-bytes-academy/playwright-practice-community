import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class HomePage extends BasePage {
  readonly siteTitle: Locator;
  readonly siteDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.siteTitle = page.locator('h1.site-title');
    this.siteDescription = page.locator('p.site-description');
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }
}
