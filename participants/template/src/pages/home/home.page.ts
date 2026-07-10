import { Locator, Page } from '@playwright/test';
import { BasePage } from '@template/src/pages/base.page';

export class HomePage extends BasePage {
  readonly siteDescription: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    super(page);
    this.siteDescription = page.locator('p.site-description');
    this.searchInput = page.getByRole('textbox', { name: 'Search products...' });
    this.searchButton = page.locator('button.header-search-button');
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

  async searchProduct(keyword: string): Promise<void> {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
  }
}
