import { test as base } from '@playwright/test';
import { SearchResultPage } from '@phuctien1909/src/pages/search/search-result.page';

type SearchFixtures = {
  searchResultPage: SearchResultPage;
};

export const test = base.extend<SearchFixtures>({
  searchResultPage: async ({ page }, use) => {
    const searchResultPage = new SearchResultPage(page);
    await use(searchResultPage);
  },
});

export { expect } from '@playwright/test';