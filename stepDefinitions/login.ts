// stepDefinitions/login.ts
import { Given, Then, When, Before, After } from "@cucumber/cucumber";
import { LoginPage } from "../pages/login.page";
import allure from '@wdio/allure-reporter';

Before(async function({ pickle }) {
    allure.addFeature(pickle.name);
    allure.addEnvironment('Device', process.env.DEVICE || 'Unknown');
    allure.addEnvironment('Platform', process.env.PLATFORM || 'Unknown');
    
    console.log("Before hook start");
    await driver.execute('mobile: terminateApp', { appId: 'com.saucelabs.mydemoapp.rn' });
    await driver.activateApp('com.saucelabs.mydemoapp.rn');
    console.log("Before hook end");
});

After(async function({ result }) {
    if (result?.status === 'FAILED') {
        const screenshot = await browser.takeScreenshot();
        allure.addAttachment('Screenshot', Buffer.from(screenshot, 'base64'), 'image/png');
    }
    
    console.log("After hook start");
    try {
        await driver.terminateApp('com.saucelabs.mydemoapp.rn');
    } catch (error) {
        console.log('Error in terminating app:', error);
    }
    console.log("After hook end");
});

When(/^I clicked on App Menu$/, async function() {
    allure.addStep('Clicking on App Menu');
    await LoginPage.clickOnAppMenu();
});

Then(/^I clicked on login Menu option$/, async function() {
    allure.addStep('Clicking on Login Menu');
    await LoginPage.clickOnloginMenu();
});

Then(
    /^I enter username as (.*) and password as (.*)$/,
    async function(username: string, password: string) {
        allure.addStep(`Entering credentials - Username: ${username}, Password: ${'*'.repeat(password.length)}`);
        
        if (username === '""') {
            await LoginPage.userNameInputFieldElement.setValue('');
        } else {
            await LoginPage.userNameInputFieldElement.setValue(username);
        }

        if (password === '""') {
            await LoginPage.passwordInputFieldElement.setValue('');
        } else {
            await LoginPage.passwordInputFieldElement.setValue(password);
        }
    }
);

When(/^I clicked on login button$/, async function() {
    allure.addStep('Clicking login button');
    await (await LoginPage.loginButton).click();
});

Then(/^I should see (.*)$/, async function(result: string) {
    if (result.includes('I check login is successful')) {
        allure.addStep('Verifying successful login');
        await LoginPage.verifySuccessfulLogin();
    } else {
        const errorText = result.replace('I check login is unsuccessful with text ', '');
        allure.addStep(`Verifying error message: ${errorText}`);
        await LoginPage.verifyUnsuccessfulLogin(errorText);
    }
});