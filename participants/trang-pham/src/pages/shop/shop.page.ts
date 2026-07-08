import { Page } from '@playwright/test';
import { title } from 'node:process';


export class ShopPage {
    page: Page;

    get courses() {
        return {
            title: (courseName: string) => this.page.getByRole('heading',{ name: courseName , level: 1})
        }
    }

    
    constructor(page: Page) {
        this.page = page
    }

}