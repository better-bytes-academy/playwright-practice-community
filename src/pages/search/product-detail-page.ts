import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class ProductDetailPage extends BasePage {
    readonly productTitle = this.page.locator('.product_title, h1.entry-title');
    readonly productDescription = this.page.locator('.woocommerce-product-details__short-description, .description').first();
    // dùng .first() vì xuất hiện cả 2 class này cùng lúc.

    constructor(page: Page) {
        super(page)
    }

    async verifyContentContainsKeyword(keyword: string): Promise<void> {
        const lowerKeyword = keyword.toLocaleLowerCase();

        await expect.poll(async () => {
            const titleText = (await this.productTitle.innerText()).toLowerCase();
            let descriptionText = '';

            if (await this.productDescription.isVisible()) {
                descriptionText = (await this.productDescription.innerText()).toLowerCase();
            }

            return titleText.includes(lowerKeyword) || descriptionText.includes(lowerKeyword);
        }, {
            message: `Expected product title or description to contain "${keyword}"`,
            timeout: 5000,
        }).toBe(true);

    }

    async goBack(): Promise<void> {
        await this.page.goBack();
    }
}