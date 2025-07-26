// npx playwright codegen https://the-internet.herokuapp.com/
// npm run test

const { Given } = require('@cucumber/cucumber');
const { getPage } = require('../playwrightUtilities');

Given('open the {string} page', async function (url) {
  await getPage().goto(url);
});

