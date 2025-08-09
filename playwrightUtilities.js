const { chromium } = require('playwright');
let browser = null;
let page = null;
const DEFAULT_TIMEOUT = 30000;

async function initializeBrowser() {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
  }
}

async function initializePage() {
  if (browser && !page) {
    page = await browser.newPage();
    page.setDefaultTimeout(DEFAULT_TIMEOUT);
  }
}

function getPage() {
  if (!page) throw new Error('Page has not been initialized. Please call initializePage first.');
  return page;
}

async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
}

module.exports = { initializeBrowser, initializePage, getPage, closeBrowser };

// Launches the browser if not already launched
async function initializeBrowser() {
  if (!browser) {
    browser = await chromium.launch({ headless: false });
  }
}

// Creates a new page if not already created
async function initializePage() {
  if (browser && !page) {
    page = await browser.newPage();
    page.setDefaultTimeout(DEFAULT_TIMEOUT);
  }
}

// Returns the current page, throws error if not initialized
function getPage() {
  if (!page) {
    throw new Error('Page has not been initialized. Please call initializePage first.');
  }
  return page;
}

// Closes the browser and resets browser/page variables
async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
    page = null;
  }
}

module.exports = {
  initializeBrowser,
  initializePage,
  getPage,
  closeBrowser,
  browser: () => browser,
  moveSliderTo
};

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