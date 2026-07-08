import { test as base } from '@playwright/test';
import { ShopPage } from '../../pages/shop/shop.page';

type ShopFixtures = {
    shopPage: ShopPage;
}

export const test = base.extend <ShopFixtures> (
    {
        shopPage: async ({page}, use) => {
            const shopPage = new ShopPage(page);

            await use(shopPage);
        }
    }
)