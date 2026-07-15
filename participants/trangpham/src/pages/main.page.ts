import { Locator, Page } from '@playwright/test';
import { BasePage } from '@trangpham/src/pages/base.page';

export class MainPage extends BasePage {
    readonly searchFld: Locator;
    readonly categorySlt: Locator;
    readonly searchBtn: Locator;

    get siteTitle() {
        return {
        title: (title: string) => this.page.getByRole("heading", { level: 1, name: title}),
        description: (description: string) => this.page.getByText(description),
        }
    }

    constructor(page: Page) {
        super(page);
        this.searchFld = page.locator('input.header-search-input');
        this.categorySlt = page.locator('select.header-search-select');
        this.searchBtn = page.locator('button.header-search-button');
    }

    searchItem = async (itemName: string) => {
        await this.searchFld.fill(itemName);
        await this.searchBtn.click();
    }

}

