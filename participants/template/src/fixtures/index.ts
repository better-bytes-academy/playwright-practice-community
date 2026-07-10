import { mergeTests } from '@playwright/test';
import { test as homeTest } from '@template/src/fixtures/home/home.fixture';

export const test = mergeTests(homeTest);

export { expect } from '@playwright/test';