import { HomePage } from '@trangpham/src/pages/home/home.page';
import { test as base } from '@playwright/test';

type HomeFixture = {
    homePage: HomePage;
}

export const test = base.extend <HomeFixture> (
    {
        homePage : async ({page}, use) => {
        const homePage = new HomePage(page);
        
        await use(homePage);

        }
    }
)