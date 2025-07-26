// npx playwright codegen https://the-internet.herokuapp.com/
const { Then } = require('@cucumber/cucumber');
const { getPage, browser } = require('../playwrightUtilities');
const assert = require('assert');
const { get } = require('http');
const { chromium } = require('playwright');

// A/B testing --------------------------------------------------------------------------------------------------------------
Then('click on AB Testing', async function () {
    await getPage().getByRole('link', { name: 'A/B Testing' }).click();
});

Then('check the heading', async function () {
    const heading = await getPage().locator('h3').textContent();
    assert(['A/B Test Variation 1', 'A/B Test Control'].includes(heading.trim()));
    console.log(heading);
});

// Add/Remove Elements ------------------------------------------------------------------------------------------------------
Then('click on add remove elements', async function () {
    await getPage().getByRole('link', { name: 'Add/Remove Elements' }).click();
});

Then('click add 5 times', async function () {
    const click = 5;
    for (let i = 0; i < click; i++) {
        const add = await getPage().getByRole('button', { name: 'Add Element' }).click()
    }
});

Then('see if there are 5 elements', async function () {
    const elements = getPage().locator('.added-manually');
    const count = await elements.count();
    assert.strictEqual(count, 5);
});

Then('click remove 2 times', async function () {
    const elements = getPage().getByRole('button', { name: 'Delete' });
    const count = 2;
    for (let i = 0; i < count; i++) {
        const element = elements.nth(i);
        await element.click();
    }
});

Then('see if there are 3 elements', async function () {
    const elements = getPage().locator('.added-manually');
    const count = await elements.count();
    assert.strictEqual(count, 3);
});

// Basic Auth --------------------------------------------------------------------------------------------------------------
Then('click on basic auth', async function () {
    await getPage().getByRole('link', { name: 'Basic Auth' }).click();
});

Then('login with admin creds', async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        httpCredentials: {
            username: 'admin',
            password: 'admin'
        }
    });
    const page = await context.newPage();
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    this.page = page;
    this.context = context;
    this._basicAuthBrowser = browser;
});

Then('check for congrats message', async function () {
    const basicAuthHead = await this.page.locator('p').textContent();
    assert(basicAuthHead.includes('Congratulations! You must have the proper credentials.'));
});

// Broken Images ------------------------------------------------------------------------------------------------------------

Then('click on broken images', async function () {
    await getPage().getByRole('link', { name: 'Broken Images' }).click();
});

Then('wait to make sure then have time to load in', async function () {
    await getPage().waitForTimeout(1000);
});

Then('check for broken images', async function () {
    const images = getPage().locator('.example img');
    const count = await images.count();
    console.log('');
    for (let i = 0; i < count; i++) {
        const image = await images.nth(i);
        const width = await image.evaluate(img => img.naturalWidth)
        if (width === 0) {
            console.log(`image: ${i + 1} is broken`);
        }
    }
});

// Challenging DOM ---------------------------------------------------------------------------------------------------------

Then('click on chellenging dom', async function () {
    await getPage().getByRole('link', { name: 'Challenging DOM' }).click();
});

Then('read the diceret in row 4 i guess, should way Phaedrum3', async function () {
    const row3 = getPage().locator('tbody tr').nth(3);
    const diceretRow3 = await row3.locator('td').nth(5).textContent();
    assert.strictEqual(diceretRow3, 'Phaedrum3');    
});