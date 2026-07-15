import { test, expect } from '@trangpham/src/fixtures';

const testData = {
    searchTxt : 'ISTQB'
}

test('HOME_20260701: Search courses', async ({ mainPage, searchPage, productPage}) => {
    await test.step('Go to E-commerce site testing', async () => {
        await expect(mainPage.siteTitle.title('E-commerce site testing')).toBeVisible();
        await expect(mainPage.siteTitle.description('Website thực hành – hoctest.com')).toBeVisible();
    })

    await test.step('Search courses', async () => {
        await expect(mainPage.categorySlt).toContainText('All Categories');
        await mainPage.searchItem(testData.searchTxt);
        await expect(searchPage.page).toHaveURL(`?post_type=product&s=${testData.searchTxt}&product_cat=`);

        const numberOfCourses = await searchPage.countCourses();

        await expect(searchPage.result.searchResults(testData.searchTxt)).toBeVisible();
        await expect(searchPage.result.showingAllResults(5)).toBeVisible();
        expect(numberOfCourses).toBe(5);
    })

    await test.step('Open courses in details', async () => {
        const listCourses = await searchPage.coursesNames();

        for(let course of listCourses) {
            await searchPage.openDetailCourse(course);
            await expect(productPage.courses.title(course)).toBeVisible();
            await productPage.page.goBack();
            await expect(searchPage.result.searchResults(testData.searchTxt)).toBeVisible();
        }
        
    })
})



