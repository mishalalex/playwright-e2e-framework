import {chromium} from "playwright";

describe('Upload file test using SendGB.com', () => {
    const filePath0 = './videos/a.webm';
    const filePath1 = './videos/b.webm';

    test('Upload a file using set input files', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext();
        const page = await context.newPage()
        await page.goto('https://www.sendgb.com');
        await page.setInputFiles("input[name='qqfile']", filePath0);
        await browser.close();
    })
    test('Upload a file using on function', async () => {
        const browser = await chromium.launch({
            headless: false
        })
        const context = await browser.newContext();
        const page = await context.newPage()
        await page.goto('https://the-internet.herokuapp.com/upload')
        // pre-requisite step for the next line
        page.on("filechooser",async (filechooser)=>{
            await filechooser.setFiles([filePath0,filePath1])
        })
        // the windows pop up that opens when this line is executed is handled by the previous page.on function
        await page.click('.example+div#drag-drop-upload', {force:true})
        await browser.close();
    })
})