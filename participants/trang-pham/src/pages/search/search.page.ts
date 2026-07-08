import { Page } from '@playwright/test';

export class SearchPage {
    page: Page;
    count: number = 0;

    get result() {
        return {
            searchResults: (searchKey: string) => this.page.getByText(`Search results: "${searchKey}"`),
            showingAllResults: (number: number) => this.page.getByText(`Showing all ${number} results`),
        }
    }

    constructor(page: Page) {
        this.page = page;
    }

    countCourses = async () => {
        return this.page.locator('.products.columns-4 li').count();
    }

    coursesNames = async () => {
        return this.page.locator('.woocommerce-loop-product__title').allTextContents();
    }

    openDetailCourse = async (courseName: string) => {
        await this.page.getByText(courseName, {exact: true}).click();
    }
}