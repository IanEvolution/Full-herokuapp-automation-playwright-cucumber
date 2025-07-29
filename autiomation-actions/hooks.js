const { Before, After } = require('@cucumber/cucumber');
const { initializeBrowser, initializePage, closeBrowser, getPage } = require('../playwrightUtilities');
const { setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(20000);

Before(async function () {
    await initializeBrowser();
    await initializePage();
    await getPage().setDefaultTimeout(20000);
});

After(async function () {
    if (this._basicAuthBrowser) {
    await this._basicAuthBrowser.close();
    }
    await closeBrowser();
});
