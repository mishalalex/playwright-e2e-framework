import {Browser, BrowserContext, chromium, Page} from "playwright";

describe('Demonstrating how various type of dialogue boxes are handled in playwright', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async ()=>{
        browser = await chromium.launch({
            headless: false
        });
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('https://letcode.in/alert')
    });

    test('Handle dialog box - Prompt alert box', async () => {
        const promptAlertButton = await page.$("#prompt");
        page.on("dialog",(dialog)=>{
            console.log("Message: "+dialog.message());
            console.log("Default Value: "+dialog.defaultValue());
            console.log("Type: "+dialog.type());
            dialog.accept("Hello Mishal");
        })
        await promptAlertButton?.click();
    });

    afterAll(async ()=> {
        await page.close();
        await context.close();
        await browser.close();
    });
});