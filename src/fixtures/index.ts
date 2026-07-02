import { mergeTests } from '@playwright/test';
import { test as homeTest } from './home/home.fixture';
import { test as searchTest } from './search/search.fixture';
import { test as shopTest } from './shop/shop.fixture';

export const test = mergeTests(homeTest, searchTest, shopTest);

export { expect } from '@playwright/test';
