const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.join(__dirname, 'date-filter-screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  // Step 1: Navigate and wait for app to load
  console.log('Navigating to app...');
  await page.goto('http://10.255.185.121:5173/ui/', { timeout: 30000 });

  // Wait for "Please Wait" to disappear or for inputs to appear
  console.log('Waiting for page to load...');
  await page.waitForFunction(() => !document.body.innerText.includes('Please Wait'), { timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  console.log('Current URL after wait:', page.url());
  await page.screenshot({ path: path.join(screenshotsDir, '00-after-wait.png') });

  // Dump all inputs on the page
  const allInputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input')).map(el => ({
      outerHTML: el.outerHTML,
      type: el.type,
      name: el.name,
      id: el.id,
      placeholder: el.placeholder,
      visible: el.offsetParent !== null
    }));
  });
  console.log('All inputs:', JSON.stringify(allInputs, null, 2));

  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 1000));
  console.log('Body text:', bodyText);

  const pageHTML = await page.evaluate(() => document.body.innerHTML.substring(0, 2000));
  console.log('Body HTML:', pageHTML);

  await page.waitForTimeout(2000);
  await browser.close();
})();
