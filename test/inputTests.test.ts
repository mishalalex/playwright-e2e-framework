import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('testing various input tests',() => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async ()=> {
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://letcode.in/edit')
    });

    test('Validate the input field', async () => {
        await page.type("id=fullName","Mishal Alexander")
    });

    test('Append a text and press keyboard tab', async () => {
        const join = await page.$("#join");
        await join?.focus();
        await page.keyboard.press("End");
        await join?.type(" human");
    });

    test('Get the value inside a text box', async () => {
        const textBoxValue = await page.getAttribute("id=getMe","value");
        console.log(textBoxValue);
    });

    test('Clear the text inside a text box', async () => {
        await page.fill("id=clearMe","")
    });

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    });
});