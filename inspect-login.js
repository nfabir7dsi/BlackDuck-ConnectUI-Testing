const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.join(__dirname, 'date-filter-screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);

  // Step 1: Navigate
  console.log('Navigating to app...');
  await page.goto('http://10.255.185.121:5173/ui/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.waitForTimeout(3000);

  console.log('Current URL:', page.url());
  await page.screenshot({ path: path.join(screenshotsDir, '00-initial-page.png') });

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
  console.log('All inputs on page:', JSON.stringify(allInputs, null, 2));

  // Also dump all buttons
  const allButtons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).map(el => ({
      text: el.innerText.trim(),
      type: el.type,
      id: el.id,
      className: el.className.substring(0, 100)
    }));
  });
  console.log('All buttons:', JSON.stringify(allButtons, null, 2));

  // Print page title and body text snippet
  const title = await page.title();
  console.log('Page title:', title);

  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('Body text snippet:', bodyText);

  await page.waitForTimeout(2000);
  await browser.close();
})();
