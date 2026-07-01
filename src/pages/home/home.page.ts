import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class HomePage extends BasePage {
  readonly siteDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.siteDescription = page.locator('p.site-description');
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
}
