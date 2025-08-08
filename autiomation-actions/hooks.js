const { Before, After } = require('@cucumber/cucumber');
const { initializeBrowser, initializePage, closeBrowser, getPage } = require('../playwrightUtilities');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(20000);

Before(async function (scenario) {
    if (scenario.pickle.tags.some(tag => tag.name === '@geolocation')) {
        const { chromium } = require('playwright');
        this.browser = await chromium.launch();
        this.context = await this.browser.newContext({
            permissions: ['geolocation'],
            geolocation: { latitude: 44.97408, longitude: -124.010496 }
        });
        this.page = await this.context.newPage();
        await this.page.setDefaultTimeout(20000);
    } else {
        await initializeBrowser();
        await initializePage();
        await getPage().setDefaultTimeout(20000);
    }
});

After(async function () {
    if (this._basicAuthBrowser) {
    await this._basicAuthBrowser.close();
    }
    await closeBrowser();
});
