import {chromium} from "playwright";

describe('Login', () => {
    test('Open LetCode',async ()=>{
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://letcode.in/');
        await page.click("text=Log in");
        await page.fill("input[name='email']",'mowyzew@yopmail.com')
        await page.fill("input[name='password']",'Password@123$')
        await page.click('button:text("LOGIN")');
        await page.click('"Sign out"');
        await browser.close();
    });
    test('Recorded script', async () => {
        const browser = await chromium.launch({
            headless: false
        });
        const context = await browser.newContext({
            recordVideo: {
                dir: "./videos/",
                size: {
                    width: 800,
                    height: 600
                }
            }
        });
        const page = await context.newPage();
        await page.goto('https://letcode.in/');
        await page.locator('div').filter({ hasText: 'LetCode with KoushikInsights' }).first().click();
        await page.getByRole('link', { name: 'Log in' }).click();
        await page.getByRole('textbox', { name: 'Enter registered email' }).click();
        await page.getByRole('textbox', { name: 'Enter registered email' }).click();
        await page.getByRole('textbox', { name: 'Enter registered email' }).fill('mowyzew@yopmail.com');
        await page.getByPlaceholder('Enter password').click();
        await page.getByPlaceholder('Enter password').fill('Password@123$');
        await page.getByRole('button', { name: 'LOGIN' }).click();
        await page.getByLabel('Welcome Rama Rice').click();
        await page.getByRole('link', { name: 'Sign out' }).click();
        await browser.close();
    });
})
//mowyzew@yopmail.com
//Password@123$
