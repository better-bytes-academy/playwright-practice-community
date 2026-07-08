import { test as homeTest } from './home/home.fixture';
import { test as searchTest } from './search/search.fixture';
import { test as shopTest } from './shop/shop.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(homeTest, shopTest, searchTest);
  
export { expect } from '@playwright/test';