import {Browser, BrowserContext, chromium, Page} from "playwright";
import {expect} from "playwright/test";

describe('Script to handle drop downs in a page', () => {
    let browser : Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async ()=> {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://letcode.in/dropdowns');
    });

    test('Select a drop down based on value', async () => {
        const fruitsDropDown = await page.$("#fruits");
        await fruitsDropDown?.selectOption("2");
        const fruitIsSelectedMessage= await page.$("div.notification.is-success");
        if(fruitIsSelectedMessage){
            expect(await fruitIsSelectedMessage.textContent()).toContain("Orange");
        }
    });

    test('Multiple dropdown selection', async () => {
        const superHeroDropDown = await page.$("superheros");
        await superHeroDropDown?.selectOption([{label: "Aquaman"},{value:"bt"},{index:8}]);
    });

    test('Count the total number of drop down options', async () => {
        const languageOptions = await page.$$("#lang option");
        console.log(languageOptions.length)
    });

    test('Get the selected text', async () => {
        //const countryDropDown = await page.selectOption("#country",{index:2});
        await page.selectOption("#country","India")
        const countries = await page.$eval<string, HTMLSelectElement>("#country", ele => ele.value)
        console.log(countries);
        expect(countries).toBe("India");
    })

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    })
})