const { Given, When, Then,After } = require('@wdio/cucumber-framework');

const LoginPage = require('../pageobjects/login.page');
const SecurePage = require('../pageobjects/secure.page');

const pages = {
    login: LoginPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    await LoginPage.login(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});

After(async function (scenario) {
    /*  utils.print("status: " + scenario.result.status);
     // if (scenario.result.status=== Status.FAILED) {
     const attach = await this.attach; // cucumber's world object has attach function which should be used
     var png = await browser.takeScreenshot();
     const decodedImage = Buffer.from(png, 'base64');
 
     attach(decodedImage, 'image/png');
     // } */
 
     
         const cucumberJson = require('wdio-cucumberjs-json-reporter').default;
         cucumberJson.attach(browser.takeScreenshot(), 'image/png');
     
 });
