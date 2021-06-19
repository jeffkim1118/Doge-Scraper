const puppeteer = require('puppeteer');

async function scrapeDoge(url){
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="quote-header-info"]/div[3]/div[1]/div/span[1]');
    const doge = await el.getProperty('textContent');
    const dogePrice = await doge.jsonValue();

    const [el2] = await page.$x('//*[@id="quote-header-info"]/div[3]/div[1]/div/span[2]');
    const doge2 = await el2.getProperty('textContent');
    const dogeChange = await doge2.jsonValue();

    console.log('Price per share $' + dogePrice);
    console.log('change:' + dogeChange);
    browser.close();
}
scrapeDoge('https://finance.yahoo.com/quote/DOGE-USD/')