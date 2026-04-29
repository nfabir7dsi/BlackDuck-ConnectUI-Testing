const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const screenshotsDir = path.join(__dirname, 'date-filter-screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);

  await page.goto('http://10.255.185.121:5173/ui/');
  await page.waitForTimeout(2000);
  await page.waitForSelector('input[name="username"]');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'C0ver1ty!');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  await page.goto('http://10.255.185.121:5173/ui/projects');
  await page.waitForSelector('[data-testid="project-list-table"]');
  await page.waitForTimeout(1000);
  await page.click('[data-testid="row-0-project-column"] a');
  await page.waitForSelector('[data-testid="issue-list-table"]');
  await page.waitForTimeout(1500);

  // Open First Detected filter → select "In the range"
  await page.click('[data-testid="filters-section"] button:has-text("Add filters")');
  await page.waitForSelector('[role="listbox"]');
  await page.waitForTimeout(500);
  await page.click('[role="listbox"] [role="option"]:has-text("First Detected")');
  await page.waitForSelector('[data-testid="filter-content"]');
  await page.waitForTimeout(800);
  const inRangeLabel = page.locator('[data-testid="filter-content"] label').filter({ hasText: 'In the range' }).first();
  await inRangeLabel.click({ force: true });
  await page.waitForTimeout(800);

  // Open the "From" calendar picker
  await page.locator('[data-testid="filter-content"] button[aria-haspopup="dialog"]').first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, 'calendar-open.png') });

  // Dump the FULL calendar dialog HTML
  const calHTML = await page.evaluate(() => {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')];
    // The calendar is the one without data-testid="filter-content"
    const cal = dialogs.find(d => d.getAttribute('data-testid') !== 'filter-content');
    return cal ? cal.outerHTML : 'calendar not found';
  });
  fs.writeFileSync(path.join(screenshotsDir, 'calendar-full.html'), calHTML);
  console.log('Calendar HTML (first 4000 chars):');
  console.log(calHTML.substring(0, 4000));

  // List ALL clickable elements in the calendar
  const calClickables = await page.evaluate(() => {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')];
    const cal = dialogs.find(d => d.getAttribute('data-testid') !== 'filter-content');
    if (!cal) return [];
    return [...cal.querySelectorAll('button, [role="button"], select, [role="combobox"], [role="listbox"], [role="option"]')]
      .map(el => ({
        tag: el.tagName,
        role: el.getAttribute('role'),
        text: el.innerText?.trim().substring(0, 50),
        ariaLabel: el.getAttribute('aria-label'),
        ariaHasPopup: el.getAttribute('aria-haspopup'),
        className: el.className.substring(0, 80),
        outerHTML: el.outerHTML.substring(0, 300)
      }));
  });
  console.log('\nAll clickable elements in calendar:');
  console.log(JSON.stringify(calClickables, null, 2));

  // Try clicking any header/caption button (month/year selector)
  console.log('\nTrying to click month/year caption button...');
  const captionBtn = await page.evaluate(() => {
    const dialogs = [...document.querySelectorAll('[role="dialog"]')];
    const cal = dialogs.find(d => d.getAttribute('data-testid') !== 'filter-content');
    if (!cal) return null;
    // Look for any button that shows month name or year (not a nav or day button)
    const buttons = [...cal.querySelectorAll('button')];
    const headerBtn = buttons.find(b => {
      const text = b.innerText?.trim();
      const ariaLabel = b.getAttribute('aria-label') || '';
      const isNav = ariaLabel.includes('Month');
      const isDay = /^\d{1,2}$/.test(text);
      return !isNav && !isDay && text && text.length > 2;
    });
    return headerBtn ? { text: headerBtn.innerText?.trim(), outerHTML: headerBtn.outerHTML } : null;
  });
  console.log('\nCaption/header button:', JSON.stringify(captionBtn, null, 2));

  if (captionBtn) {
    // Try clicking it to see if a month/year dropdown opens
    const headerBtnEl = page.locator('[role="dialog"]:not([data-testid="filter-content"]) button').filter({ hasText: captionBtn.text }).first();
    await headerBtnEl.click({ force: true }).catch(e => console.log('Click failed:', e.message));
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(screenshotsDir, 'after-caption-click.png') });

    const afterClickHTML = await page.evaluate(() => {
      const dialogs = [...document.querySelectorAll('[role="dialog"]')];
      const cal = dialogs.find(d => d.getAttribute('data-testid') !== 'filter-content');
      return cal ? cal.outerHTML : '';
    });
    fs.writeFileSync(path.join(screenshotsDir, 'after-caption-click.html'), afterClickHTML);
    console.log('\nHTML after caption click (first 3000):');
    console.log(afterClickHTML.substring(0, 3000));
  }

  await page.waitForTimeout(2000);
  await browser.close();
})();
