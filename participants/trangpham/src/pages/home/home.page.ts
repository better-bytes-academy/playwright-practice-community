import { Page } from '@playwright/test';
import { MainPage } from '@trangpham/src/pages/main.page';

export class HomePage extends MainPage {

    constructor(page: Page) {
        super(page);
    }
}