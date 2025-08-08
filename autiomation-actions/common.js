const { Given } = require('@cucumber/cucumber');
const { getPage } = require('../playwrightUtilities');

Given('open the {string} page', async function (url) {
  if(this.page) {
    await this.page.goto(url);
  } else {
    await getPage().goto(url);
  }
});