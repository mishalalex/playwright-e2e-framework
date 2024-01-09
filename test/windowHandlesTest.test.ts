import {Browser, BrowserContext, chromium, Page} from "playwright";
import {expect} from "playwright/test";

describe('Window Script', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async ()=> {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://letcode.in/windows')
    });

    test('Single window handling', async () =>{
        const [newWindow] = await Promise.all([
            context.waitForEvent("page"),
            await page.click("#home")
        ]);
        await newWindow.waitForLoadState();
        expect(newWindow.url()).toContain("test");
        await newWindow.click('"Log in"');
        expect(newWindow.url()).toContain("signin");
    })

    afterAll(async ()=> {
        await page.close();
        await context.close();
        await browser.close();
    })
})