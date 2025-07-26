const { Before, After } = require('@cucumber/cucumber');
const { initializeBrowser, initializePage, closeBrowser } = require('../playwrightUtilities');

Before(async function () {
    await initializeBrowser();
    await initializePage();
});

After(async function () {
    if (this._basicAuthBrowser) {
    await this._basicAuthBrowser.close();
    }
    await closeBrowser();
});
