import { Locator, Page } from '@playwright/test';

export class BasePage {
    page: Page;

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
        this.page = page;
        this.searchFld = page.locator('input.header-search-input');
        this.categorySlt = page.locator('select.header-search-select');
        this.searchBtn = page.locator('button.header-search-button');    }

    navigateMainPage = async (path: string = '') => {
        await this.page.goto(path);
    }

    searchItem = async (itemName: string) => {
        await this.searchFld.fill(itemName);
        await this.searchBtn.click();
    }

}

