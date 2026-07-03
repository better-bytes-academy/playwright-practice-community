import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class SearchResultPage extends BasePage {
    readonly productItem = this.page.locator('li.product');

    constructor(page: Page) {
        super(page)
    }

    async verifyUrlParams(expectedParam: string): Promise<void> {
        await expect.poll(() => this.page.url()).toContain(expectedParam);
    }

    async verifyProductCount(expectedCount: number): Promise<void> {
        await expect(this.productItem).toHaveCount(expectedCount);
    }

    async clickProductByIndex(index: number): Promise<void> {
        // Tìm đến sản phẩm thứ index, lấy thẻ <a> đầu tiên và click
        await this.productItem.nth(index).locator('a').first().click();
    }
}