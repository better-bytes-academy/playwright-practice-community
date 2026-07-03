//import { test, expect } from '@fixtures';
import {test, expect} from '@fixtures/home/home.fixture';

test.describe('HOME_20260701: Search Product', () => {
    test('Check search function at Homepage', async ({ homePage, searchResultPage, productDetailPage }) => {
        const SEARCH_KEYWORD = 'ISTQB';
        const EXPECTED_URL_PARAM = 'post_type=product&s=ISTQB&product_cat=';
        const EXPECTED_PRODUCT_COUNT = 5;

        await homePage.goto();
        await homePage.searchProduct(SEARCH_KEYWORD);

        await searchResultPage.verifyUrlParams(EXPECTED_URL_PARAM);
        await searchResultPage.verifyProductCount(EXPECTED_PRODUCT_COUNT);

        for (let i = 0; i < EXPECTED_PRODUCT_COUNT; i++) {
            await searchResultPage.clickProductByIndex(i);
            await productDetailPage.verifyContentContainsKeyword(SEARCH_KEYWORD);
            await productDetailPage.goBack();
        }
    })
})