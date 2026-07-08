import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specific path relative to the baseURL or an absolute URL.
   */
  async navigate(path: string = '/'): Promise<void> {

    await this.page.goto(path);
  }
}
