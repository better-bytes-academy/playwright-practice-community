import { SearchPage } from '../../src/pages/search/search.page';
import { test, expect } from '../../src/fixtures';
import { ShopPage } from '../../src/pages/shop/shop.page';

const testData = {
    searchTxt : 'ISTQB'
}

test('HOME_20260701: Search courses', async ({ basePage, searchPage, shopPage}) => {
    await test.step('Go to E-commerce site testing', async () => {
        await basePage.navigateMainPage();
        await expect(basePage.siteTitle.title('E-commerce site testing')).toBeVisible();
        await expect(basePage.siteTitle.description('Website thực hành – hoctest.com')).toBeVisible();
    })

    await test.step('Search courses', async () => {
        await expect(basePage.categorySlt).toContainText('All Categories');
        await basePage.searchItem(testData.searchTxt);
        await expect(basePage.page).toHaveURL(`?post_type=product&s=${testData.searchTxt}&product_cat=`);

        const numberOfCourses = await searchPage.countCourses();
        
        expect(numberOfCourses).toBe(5);
    })

    await test.step('Open courses in details', async () => {
        const listCourses = await searchPage.coursesNames();

        for(let course of listCourses) {
            await searchPage.openDetailCourse(course);
            await expect(shopPage.courses.title(course)).toBeVisible();
            await searchPage.page.goBack();
        }
        
    })
})



