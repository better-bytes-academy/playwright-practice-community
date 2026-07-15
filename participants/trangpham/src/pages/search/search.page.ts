import { Page } from '@playwright/test';
import { MainPage } from '@trangpham/src/pages/main.page';

export class SearchPage extends MainPage {
    count: number = 0;

    get result() {
        return {
            searchResults: (searchKey: string) => this.page.getByRole('heading', {name: `Search results: “${searchKey}”`}),
            showingAllResults: (number: number) => this.page.getByText(`Showing all ${number} results`),
        }
    }

    constructor(page: Page) {
        super(page)    
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