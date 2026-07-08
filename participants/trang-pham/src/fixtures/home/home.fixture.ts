import { HomePage } from '../../pages/home/home.page';
import { test as base, expect } from '@playwright/test';

type HomeFixture = {
    homePage: HomePage;
}

export const test = base.extend <HomeFixture> (
    {
        homePage : async ({page}, use) => {
        const homePage = new HomePage(page);
        
        // Setup
        await homePage.navigateMainPage();
        await use(homePage);

        }
    }
)

export { expect }
