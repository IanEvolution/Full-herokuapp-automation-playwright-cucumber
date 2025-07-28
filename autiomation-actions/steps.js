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
            console.log('\x1b[31m%s\x1b[0m', `image: ${i + 1} is broken`);
        }
    }
});

// Challenging DOM ---------------------------------------------------------------------------------------------------------

Then('click on chellenging dom', async function () {
    await getPage().getByRole('link', { name: 'Challenging DOM' }).click();
});

Then('read the diceret in row 4 i guess, should say Phaedrum3', async function () {
    const row3 = getPage().locator('tbody tr').nth(3);
    const diceretRow3 = await row3.locator('td').nth(5).textContent();
    assert.strictEqual(diceretRow3, 'Phaedrum3');    
});

// Checkboxes --------------------------------------------------------------------------------------------------------------

Then('click on checkboxes', async function () {
    await getPage().getByRole('link', { name: 'Checkboxes' }).click();
});

Then('read the current state of the checkboxes', async function () {
    const checkboxes = getPage().locator('#checkboxes input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        const status = await checkbox.isChecked();
        console.log(`checkbox ${i + 1} is ${status ? 'checked' : 'unchecked'}`);
    }
});

Then('click the check boxes', async function () {
    const checkboxes = getPage().locator('#checkboxes input[type="checkbox"]');
    const count = await checkboxes.count();
    for (let i = 0; i < count; i++) {
        const checkbox = checkboxes.nth(i);
        await checkbox.click();

    }
});

Then('just reclick the first one for fun', async function () {
    await getPage().getByRole('checkbox').first().click();
});

// Context Menu -------------------------------------------------------------------------------------------------------------

Then('click on context menu', async function () {
    await getPage().getByRole('link', { name: 'Context Menu' }).click();
});

Then('right click the box and assert for the context menu for {string}', async function (expectedMessage) {
    let dialogHandled = false;
    getPage().once('dialog', async dialog => {
        dialogHandled = true;
        assert.strictEqual(dialog.message(), expectedMessage);
        await dialog.accept();
    });
    await getPage().locator('#hot-spot').click({ button: 'right' });
    await getPage().waitForTimeout(500);
    assert(dialogHandled, 'Dialog was not handled');
});

// Digest Authentication -----------------------------------------------------------------------------------------------------

Then('unfortunetly has to be all in one go or its just cuz im a novice so ready the alert then click on digest authentication and enter the login info', async function () {
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

Then('assert for {string}', async function(expectedMessage) {
    assert.strictEqual(expectedMessage, 'Congratulations! You must have the proper credentials.');
});

// Disappearing Elements -----------------------------------------------------------------------------------------------------

Then('click on disappearing elements', async function () {
    await getPage().getByRole('link', { name: 'Disappearing Elements' }).click();
});

Then('check and assert for home tab', async function () {
    const homeTab = await getPage().locator('ul li').nth(0).textContent();
    assert.strictEqual(homeTab, 'Home');
});

Then('check and assert for about tab', async function () {
    const aboutTab = await getPage().locator('ul li').nth(1).textContent();
    assert.strictEqual(aboutTab, 'About');
});

Then('check and assert for contact us tab', async function () {
    const contactUsTab = await getPage().locator('ul li').nth(2).textContent();
    assert.strictEqual(contactUsTab, 'Contact Us');
});

Then('check and assert for portfolio tab', async function () {
    const portfolioTab = await getPage().locator('ul li').nth(3).textContent();
    assert.strictEqual(portfolioTab, 'Portfolio');
});

Then('check and assert for gallery tab', async function () {
    const galleryTab = await getPage().locator('ul li').nth(4).textContent();
    assert.strictEqual(galleryTab, 'Gallery');
});

// Drag and Drop ---------------------------------------------------------------------------------------------------------------

Then('click on Drag and Drop', async function () {
    await getPage().getByRole('link', { name: 'Drag and Drop' }).click();
});

Then('assert for a then b', async function () {
    const columns = getPage().locator('.column');
    const first = (await columns.nth(0).textContent());
    const second = (await columns.nth(1).textContent());
    assert.strictEqual(first, 'A');
    assert.strictEqual(second, 'B');
});

Then('drag and drop a onto b', async function () {
    await getPage().locator('#column-a').dragTo(getPage().locator('#column-b'));
});

Then('assert for b then a', async function () {
    const columns = getPage().locator('.column');
    const first = (await columns.nth(0).textContent());
    const second = (await columns.nth(1).textContent());
    assert.strictEqual(first, 'B');
    assert.strictEqual(second, 'A');
});

// Dropdown --------------------------------------------------------------------------------------------------------------------

Then('click on Dropdown', async function () {
    await getPage().getByRole('link', { name: 'Dropdown' }).click();
});

Then('assert for option {string} when page is first loaded in', async function (expectedMessage) {
    const landingValue = await getPage().locator('#dropdown').inputValue();
    const landingText = await getPage().locator(`#dropdown option[value="${landingValue}"]`).textContent();
    assert.strictEqual(landingText, expectedMessage);
});

Then('select option 2', async function () {
    await getPage().locator('#dropdown').selectOption('2');
});

Then('assert for {string} being selected', async function (expectedMessage) {
    const landingValue = await getPage().locator('#dropdown').inputValue();
    const landingText = await getPage().locator(`#dropdown option[value="${landingValue}"]`).textContent();
    assert.strictEqual(landingText, expectedMessage);
});

// Dynamic Content -------------------------------------------------------------------------------------------------------------

Then('click on Dynamic Content', async function () {
    await getPage().getByRole('link', { name: 'Dynamic Content' }).click();
});

Then('check for any broken images', async function () {
    const images = getPage().locator('.large-2 img');
    const count = await images.count();
    await getPage().waitForTimeout(1000);
    console.log('');
    for (let i = 0; i < count; i++) {
        const image = images.nth(i);
        const width = await image.evaluate(img => img.naturalWidth);
        //console.log(width);
        if (width === 0) {
            console.log('\x1b[31m%s\x1b[0m', `image ${i + 1} is broken`);
        }
    }
});

Then('check for broken text', async function () {
    const textBlocks = getPage().locator('.large-10');
    const count = await textBlocks.count();
    for (let i = 1; i < count; i++) {
        const textBlock = await textBlocks.nth(i).textContent();
        if (textBlock === '' || textBlock === undefined || textBlock === null ) {
            console.log('\x1b[31m', `text block ${i} is broken`);
        }
    }    
});

Then('just to flex list out all image icons by names', async function () {
    const images = getPage().locator('.large-2 img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
        const src = await images.nth(i).getAttribute('src');
        if (src) {
            const filename = src.split('/').pop();
            if (filename === 'Original-Facebook-Geek-Profile-Avatar-1.jpg') {
                console.log('Mario');
            } else if (filename === 'Original-Facebook-Geek-Profile-Avatar-2.jpg') {
                console.log('Bobba Fett');
            } else if (filename === 'Original-Facebook-Geek-Profile-Avatar-3.jpg') {
                console.log('Punisher');
            } else if (filename === 'Original-Facebook-Geek-Profile-Avatar-5.jpg') {
                console.log('Wolverine');
            } else {
                console.log('Storm Trooper');
            }
        }
    }
});

// Dynamic Controls -------------------------------------------------------------------------------------------------------------------------------

Then('click on dynamic controls', async function () {
    await getPage().getByRole('link', { name: 'Dynamic Controls' }).click();
});

Then('check for checkbox', async function () {
    const checkbox = await getPage().locator('#checkbox').textContent();
    assert.strictEqual(checkbox.trim(), 'A checkbox');
});

Then('remove checkbox', async function () {
    await getPage().getByRole('button', { name: 'Remove' }).click();
});

Then('assert for {string} dc', async function (expectedMessage) {
    await getPage().locator('#message').waitFor({ state: 'visible' });
    const itsGone = await getPage().locator('#message').textContent();
    assert.strictEqual(itsGone, expectedMessage);
});

Then('enable the enable', async function () {
    await getPage().getByRole('button', { name: 'Enable' }).click();
});

Then('assert for status enabled {string} dc', async function (expectedMessage) {
    await getPage().locator('#message').waitFor({ state: 'visible' });
    const itsEnabled = await getPage().locator('#message').textContent();
    assert.strictEqual(itsEnabled, expectedMessage);
});

Then('disable for disable', async function () {
    await getPage().getByRole('button', { name: 'Disable' }).click();
});

Then('assert for status disabled {string} dc', async function (expectedMessage) {
    await getPage().locator('#message').waitFor({ state: 'visible' });
    const itsDisabled = await getPage().locator('#message').textContent();
    assert.strictEqual(itsDisabled, expectedMessage);
});

//npx cucumber-js --name "Dynamic Controls" --require autiomation-actions/hooks.js --require autiomation-actions/common.js --require autiomation-actions/steps.js --format pretty
