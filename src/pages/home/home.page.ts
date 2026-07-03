import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class HomePage extends BasePage {
  readonly siteDescription: Locator;
  readonly searchInput: Locator; //Search locator

  constructor(page: Page) {
    super(page);
    this.siteDescription = page.locator('p.site-description');
    this.searchInput = page.locator('input[name="s"]');
  }

  get homePageLocs() {
    return {
      title: (title: string) => this.page.getByRole("heading", { level: 1, name: title}),
      description: (description: string) => this.page.getByText(description),
    }
  }

  async goto(): Promise<void> {
    await this.navigate('/');
  }

  // Search product
  async searchProduct(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }
}
