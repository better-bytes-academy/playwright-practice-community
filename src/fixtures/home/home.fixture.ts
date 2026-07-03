import { test as base } from '@playwright/test';
import { HomePage } from '@pages/home/home.page';
import { SearchResultPage as SearchResultPage2 } from '@/pages/search/search-result-page-Ngoc';
import { ProductDetailPage } from '@pages/search/product-detail-page';

type HomeFixtures = {
  homePage: HomePage;
  searchResultPage: SearchResultPage2;
  productDetailPage: ProductDetailPage;
};

export const test = base.extend<HomeFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  searchResultPage: async ({ page }, use) => {
    const searchResultPage = new SearchResultPage2(page);
    await use(searchResultPage);
  },

  productDetailPage: async ({ page }, use) => {
    const productDetailPage = new ProductDetailPage(page);
    await use(productDetailPage);
  }
});

export { expect } from '@playwright/test';
