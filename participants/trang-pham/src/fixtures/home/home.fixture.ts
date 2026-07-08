import { BasePage } from '../../pages/base.page'
import { test as base, expect } from '@playwright/test'

type HomeFixture = {
    basePage: BasePage;
}

export const test = base.extend <HomeFixture> (
    {
        basePage : async ({page}, use) => {
            const basePage = new BasePage(page);
        
        // Setup
        await basePage.navigateMainPage();
        
        await use(basePage);

        }
    }
)

export { expect }
