const { Then } = require('@cucumber/cucumber');
const { getPage, browser, moveSliderTo, hoverUsers, checkingTabsAreThereForDisappearingTabs, dropDownDupSolve, assertThatTheFramesAretheFrames } = require('../playwrightUtilities');
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

Then('check for first broken image', async function () {
    const image = getPage().locator('.example img').nth(0);
    const width = await image.evaluate(img => img.naturalWidth);
    //console.log(width);
    assert.strictEqual(width, 160);
});

Then('check for second broken image', async function () {
    const image = getPage().locator('.example img').nth(1);
    const width = await image.evaluate(img => img.naturalWidth);
    assert.strictEqual(width, 160);
    //console.log(width);
});

Then('check for third broken image', async function () {
    const image = getPage().locator('.example img').nth(2);
    const width = await image.evaluate(img => img.naturalWidth);
    //console.log(width);
    assert.strictEqual(width, 160);
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

Then('read the current state of the checkboxes round 1', async function () {
    const checkBoxes = getPage().locator('#checkboxes input[type="checkbox"]');
    const checkBox1 = await checkBoxes.nth(0).isChecked();
    const checkBox2 = await checkBoxes.nth(1).isChecked();
    assert.strictEqual(checkBox1, false);
    assert.strictEqual(checkBox2, true);
});

Then('read the current state of the checkboxes round 2', async function () {
    const checkBoxes = getPage().locator('#checkboxes input[type="checkbox"]');
    const checkBox1 = await checkBoxes.nth(0).isChecked();
    const checkBox2 = await checkBoxes.nth(1).isChecked();
    assert.strictEqual(checkBox1, true);
    assert.strictEqual(checkBox2, false);
});

Then('read the current state of the checkboxes round 3', async function () {
    const checkBoxes = getPage().locator('#checkboxes input[type="checkbox"]');
    const checkBox1 = await checkBoxes.nth(0).isChecked();
    const checkBox2 = await checkBoxes.nth(1).isChecked();
    assert.strictEqual(checkBox1, false);
    assert.strictEqual(checkBox2, false);
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

Then('check and assert for tab {int} to be {string} tab', async function (tabIndex, expectedTab) {
    await checkingTabsAreThereForDisappearingTabs(getPage(), 'ul li', tabIndex - 1, expectedTab);
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
    await dropDownDupSolve(getPage(), expectedMessage);
});

Then('select option 2', async function () {
    await getPage().locator('#dropdown').selectOption('2');
});

Then('assert for {string} being selected', async function (expectedMessage) {
    await dropDownDupSolve(getPage(), expectedMessage)
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

// Dynamic Loading --------------------------------------------------------------------------------------------------

Then('click on dynamic Loading', async function () {
    await getPage().getByRole('link', { name: 'Dynamic Loading' }).click();
});

Then('click on hidden Link', async function () {
    await getPage().getByRole('link', { name: 'Example 1: Element on page' }).click();
});

Then('click the start button on the dynamic load', async function () {
    await getPage().getByRole('button', { name: 'Start' }).click();
});

Then('assert for the dynamic load "Hello World!" to appear', async function () {
    await getPage().locator('#finish h4').waitFor({ state: 'visible' });
    const helloWorld = await getPage().locator('#finish h4').isVisible();
    assert.strictEqual(helloWorld, true);
});

Then('click on the rendered Link', async function () {
    await getPage().getByRole('link', { name: 'Example 2: Element rendered' }).click();
});

// Entry Ad -----------------------------------------------------------------------------------------------------------

Then('click on entry ad', async function () {
    await getPage().getByRole('link', { name: 'Entry Ad' }).click();
});

Then('assert that the modal window appeared', async function () {
    await getPage().locator('.modal-title').waitFor({ state: 'visible' });
    const modalWindow = await getPage().locator('.modal-title').isVisible();
    assert.strictEqual(modalWindow, true);
});

Then('close the modal', async function () {
    await getPage().getByText('Close', { exact: true }).click();
});

Then('reclick the modal activate', async function () {
    await getPage().getByRole('link', { name: 'click here' }).click();
});

// Exit Intent ------------------------------------------------------------------------------------------------------

Then('click exit Intent', async function () {
    await getPage().getByRole('link', { name: 'Exit Intent' }).click();
});

Then('mouse out and assert for the modal', async function () {
    // had to get creative so i just clicked on something that was on the page to let the mouse get registered
    await getPage().getByText('Mouse out of the viewport').click();
    await getPage().mouse.move(500, -1);
    await getPage().locator('.modal-title').waitFor({ state: 'visible' });
    const mouseOutWindow = await getPage().locator('.modal-title').isVisible();
    assert.strictEqual(mouseOutWindow, true);
});

// File Download -------------------------------------------------------------------------------------------------------

Then('click on file download', async function () {
    await getPage().getByRole('link', { name: 'File Download', exact: true }).click();
});

Then('click on the logo.png and assert for file Downloaded', async function () {
    const [ download ] = await Promise.all([
        getPage().waitForEvent('download', { timeout: 5000 }),
        getPage().getByRole('link', { name: 'logo.png', exact: true }).click()
    ]);
    const path = await download.path();
    assert.ok(path, 'Download path should exist');
    const suggestedName = download.suggestedFilename();
    assert.strictEqual(suggestedName, 'logo.png');
});

// File Upload -------------------------------------------------------------------------------------------------------

Then('click file Upload', async function () {
    await getPage().getByRole('link', { name: 'File Upload' }).click();
});

Then('upload the logo.png file', async function () {
    await getPage().getByRole('button', { name: 'Choose File' }).click();
    const logoPNG = getPage().locator('#file-upload');
    await logoPNG.setInputFiles("C:\\Users\\ianho\\Downloads\\logo.png");
});

Then('click the upload button', async function () {
    await getPage().getByRole('button', { name: 'Upload' }).click();
});

Then('assert for txt that {string} and {string} in the results screen', async function (expectedMessage1, expectedMessage2) {
    await getPage().locator('h3').waitFor({ state: 'visible' });
    const fileUploaded = await getPage().locator('h3').textContent();
    const logoPNG = await getPage().locator('#uploaded-files').textContent();
    assert.strictEqual(fileUploaded, expectedMessage1);
    assert.strictEqual(logoPNG.trim(), expectedMessage2);
});

// Floating Menu ----------------------------------------------------------------------------------------------------

Then('click on floating menu', async function () {
    await getPage().getByRole('link', { name: 'Floating Menu' }).click();
});

Then('assert for menu url to be defaut {string}', async function (expectedUrl) {
    const defaultURL = getPage().url();
    assert.strictEqual(defaultURL, expectedUrl);
});

Then('click home tab in floating menu', async function () {
    await getPage().getByRole('link', { name: 'Home' }).click();
});

Then('assert for menu url to be home {string}', async function (expectedUrl) {
    const homeURL = getPage().url();
    assert.strictEqual(homeURL, expectedUrl);
});

Then('click news tab in floating menu', async function () {
    await getPage().getByRole('link', { name: 'News' }).click();
});

Then('assert for menu url to be news {string}', async function (expectedUrl) {
    const newsURL = getPage().url();
    assert.strictEqual(newsURL, expectedUrl);
});

Then('click contact tab in floating menu', async function () {
    await getPage().getByRole('link', { name: 'Contact' }).click();
});

Then('assert for menu url to be contact {string}', async function (expectedUrl) {
    const contactURL = getPage().url();
    assert.strictEqual(contactURL, expectedUrl);
});

Then('click about tab in floating menu', async function () {
    await getPage().getByRole('link', { name: 'About' }).click();
});

Then('assert for menu url to be about {string}', async function (expectedUrl) {
    const aboutURL = getPage().url();
    assert.strictEqual(aboutURL, expectedUrl);
});


// Forgot Password -----------------------------------------------------------------------------------------------


// Form authentication -------------------------------------------------------------------------------------------

Then('click form authentication', async function () {
    await getPage().getByRole('link', { name: 'Form Authentication' }).click();
});

Then('enter the user and password incorrectly and click login', async function () {
    await getPage().locator('input[name="username"]').fill('tomsmith');
    await getPage().locator('input[name="password"]').fill('blah');
    await getPage().getByRole('button', { name: ' Login' }).click();
});

Then('assert for the {string} message on the form authentication', async function (expectedMessage) {
    await getPage().locator('#flash').waitFor({ state: 'visible' });
    const wrongLogin = await getPage().locator('#flash').textContent();
    assert(wrongLogin.includes(expectedMessage)); 
});

Then('clear both fields and enter the user and password correctly this time', async function () {
    await getPage().locator('input[name="username"]').clear();
    await getPage().locator('input[name="password"]').clear();
    await getPage().locator('input[name="username"]').fill('tomsmith');
    await getPage().locator('input[name="password"]').fill('SuperSecretPassword!');
    await getPage().getByRole('button', { name: ' Login' }).click();
});

Then('assert for the message {string} on the form authentication', async function (expectedMessage) {
    await getPage().locator('#flash').waitFor({ state: 'visible' });
    const successMessage = await getPage().locator('#flash').textContent();
    assert(successMessage.includes(expectedMessage));
});

// Frames -------------------------------------------------------------------------------------------------------

Then('click on frames', async function () {
    await getPage().getByRole('link', { name: 'Frames', exact: true }).click();
});

Then('click on the nested link', async function () {
    await getPage().getByRole('link', { name: 'Nested Frames' }).click();
});

Then('click on the iframe link', async function () {
    await getPage().getByRole('link', { name: 'iFrame' }).click();
});

Then('assert that {string} frame says {string}', async function (selector, expectedMessage) {
    await assertThatTheFramesAretheFrames(getPage(), selector, expectedMessage);
});

Then('assert that bottom frame says {string}', async function (expectedMessage){
    const bottomFrame = await getPage().locator('frame[name="frame-bottom"]').contentFrame().locator('body');
    const bottomText = await bottomFrame.textContent();
    assert.strictEqual(bottomText.trim(), expectedMessage);
});

Then('click the x on the pop up for fun', async function () {
    await getPage().getByRole('button', { name: 'Close' }).click();
});

Then('assert for thet text in the paragraph thing {string}', async function (expectedMessage) {
    const paraFrame = await getPage().locator('iframe[title="Rich Text Area"]').contentFrame().locator('p');
    const paraText = await paraFrame.textContent();
    assert.strictEqual(paraText, expectedMessage);
});

// Geolocation ------------------------------------------------------------------------------------------------------------------------------------------------
// npx cucumber-js --tags "@geolocation" --require autiomation-actions/hooks.js --require autiomation-actions/common.js --require autiomation-actions/steps.js --format pretty

Then('click on Geolocation', async function () {
    await this.page.getByRole('link', { name: 'Geolocation' }).click();
});

Then('click where am i', async function () {
    await this.page.locator('button').click();
});

Then('assert for latitude to be {string} and longitude to be {string}', async function (expectedMessage1, expectedMessage2) {
    const lat = await this.page.locator('#lat-value').textContent();
    const long = await this.page.locator('#long-value').textContent();
    assert.strictEqual(lat.trim(), expectedMessage1);
    assert.strictEqual(long.trim(), expectedMessage2);
});

Then('click see it on google', async function () {
    await this.page.locator('a[href="http://maps.google.com/?q=44.97408,-124.010496"]').click();
});

Then('zoom out a bit and take a screen shot', async function () {
    const fs = require('fs');
    const path = require('path');
    const screenshotDir = path.resolve(__dirname, '../features/screenshots');
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
    }

    const screenshotPath = path.join(screenshotDir, `geolocation_screenshot_${Date.now()}.png`);
    await this.page.screenshot({ path: screenshotPath });
});

// Horizonatal SLider ---------------------------------------------------------------------------------------------------------------------------------------

Then('click on the horizontal Slider', async function () {
    await getPage().getByRole('link', { name: 'Horizontal Slider' }).click();
});

Then('slide the slider to {string}', async function (targetValue) {
    await moveSliderTo(getPage(), 'input[type="range"]', targetValue);
});

Then('assert for slider to be at {string}', async function (targetValue) {
    const valueGathered = await getPage().locator('#range').textContent();
    assert.strictEqual(valueGathered, targetValue);
});

// Hovers ---------------------------------------------------------------------------------------------------------------------------------------------------

Then('click on the Hovers', async function () {
    await getPage().getByRole('link', { name: 'Hovers' }).click();
});

Then('hover over user {string} and assert for {string} for text and is visible', async function (userIndex, expectedUser) {
    await hoverUsers(getPage(), '.figure', userIndex - 1, expectedUser);
});


/*
npx cucumber-js --name "Frames nested" --require autiomation-actions/hooks.js --require autiomation-actions/common.js --require autiomation-actions/steps.js --format pretty

npx playwright codegen https://the-internet.herokuapp.com/

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

npx cucumber-js --parallel 32 --require autiomation-actions/hooks.js --require autiomation-actions/common.js --require autiomation-actions/steps.js --format pretty

npx cucumber-js --format html:report.html --parallel 32 --require autiomation-actions/hooks.js --require autiomation-actions/common.js --require autiomation-actions/steps.js
*/