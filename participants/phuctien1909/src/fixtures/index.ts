import { mergeTests } from '@playwright/test';
import { test as homeTest } from '@phuctien1909/src/fixtures/home/home.fixture'
import { test as searchTest } from '@phuctien1909/src/fixtures/search/search.fixture'
import { test as shopTest } from '@phuctien1909/src/fixtures/shop/shop.fixture'

export const test = mergeTests(homeTest, searchTest, shopTest)

export { expect } from '@playwright/test'