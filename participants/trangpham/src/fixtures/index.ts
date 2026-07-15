import { test as homeTest } from '@trangpham/src/fixtures/home/home.fixture';
import { test as searchTest } from '@trangpham/src/fixtures/search/search.fixture';
import { test as shopTest } from '@trangpham/src/fixtures/shop/shop.fixture';
import { test as mainPage } from '@trangpham/src/fixtures/main.fixture';

import { mergeTests } from '@playwright/test';

export const test = mergeTests(homeTest, shopTest, searchTest, mainPage);
  
export { expect } from '@playwright/test';