const { chromium } = require('playwright');
let browser = null;
let page = null;
const DEFAULT_TIMEOUT = 30000;
const assert = require('assert');

async function initializeBrowser() {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
  }
}

async function initializePage () {
  if (browser && !page) {
    page = await browser.newPage();
    page.setDefaultTimeout(DEFAULT_TIMEOUT);
  }
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
}

function getPage() {
  if (!page) {
    throw new Error('Page has not been initialized. Please call initializePage first.');
  }
  return page;
}


// all my public functions that i will be growing ----------------------------------------------------------------------------------------------------

async function checkingTabsAreThereForDisappearingTabs (page, selector, index, expectedTab) {
  const tab = page.locator(selector).nth(index);
  await tab.waitFor({ state: 'visible', timeout: 5000 });
  const tabName = await tab.textContent();
  const tabVisible = await tab.isVisible();
  assert.strictEqual(tabName, expectedTab);
  assert.strictEqual(tabVisible, true)
}

async function dropDownDupSolve (page, expectedMessage) {
  const landingValue = await page.locator('#dropdown').inputValue();
  const landingText = await page.locator(`#dropdown option[value="${landingValue}"]`).textContent();
  assert.strictEqual(landingText, expectedMessage);
}

async function assertThatTheFramesAretheFrames (page, selector, expectedMessage) {
  const frame = await page.locator('frame[name="frame-top"]').contentFrame().locator(`frame[name="frame-${selector}"]`).contentFrame().locator('body');
  const text = await frame.textContent();
  assert.strictEqual(text.trim(), expectedMessage);
}

async function clickTheMenu (page, tab) {
  await page.getByRole('link', { name: `${tab}` }).click();
}

async function assertForTheFloatingMenuURL (page, expectedUrl) {
  const floatingMenuURL = page.url();
  assert.strictEqual(floatingMenuURL, expectedUrl);
}

async function moveSliderTo(page, selector, targetValue) {
  const slider = page.locator(selector);
  const box = await slider.boundingBox();
  const min = parseFloat(await slider.getAttribute('min'));
  const max = parseFloat(await slider.getAttribute('max'));
  const value = parseFloat(targetValue);
  const percent =  (value - min) / (max - min);
  const x = box.x + percent * box.width;
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + 1, y);
  await page.mouse.down();
  await page.mouse.move(x, y, { steps: 10 });
  await page.mouse.up();
}

async function hoverUsers(page, selector, index, expectedUser) {
  const card = page.locator(selector).nth(index);
  await card.locator('img[alt="User Avatar"]').hover();
  await card.locator('h5').waitFor({ state: 'visible' });
  const userVisible = await card.locator('h5').isVisible();
  const userText = await card.locator('h5').textContent();
  assert.strictEqual(userText, expectedUser);
  assert.strictEqual(userVisible, true);
}

async function scrollDown() {
  await getPage().evaluate(() => window.scrollTo(0, document.body.scrollHeight));
}

module.exports = {
  initializeBrowser,
  initializePage,
  getPage,
  closeBrowser,
  browser: () => browser,
  checkingTabsAreThereForDisappearingTabs,
  dropDownDupSolve,
  assertThatTheFramesAretheFrames,
  clickTheMenu,
  assertForTheFloatingMenuURL,
  moveSliderTo,
  hoverUsers,
  scrollDown
};