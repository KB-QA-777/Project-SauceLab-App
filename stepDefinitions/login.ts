// import { expect } from 'chai';
import { Given, Then, When } from "@cucumber/cucumber";
import { LoginPage } from "../pages/login.page";
import { Before, After } from "@cucumber/cucumber";


Before(async () => {
  console.log("Before hook start");
 
  console.log("Before hook end");
});

After(async () => {
  console.log("After hook start");
 
  console.log("After hook end");
});
When(/^I clicked on App Menu/, async () => {
  await LoginPage.clickOnAppMenu();
});

Then(/^I clicked on login Menu option/, async () => {
  await LoginPage.clickOnloginMenu();
});

Then(
    /^I enter username as (.*) and password as (.*)/,
    async (username, password) => {
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
When(/^I clicked on login button/, async () => {
  (await LoginPage.loginButton).click();
});
Then(/^I check login is successful/, async () => {
  await expect(LoginPage.bagPackElement).toBeExisting();
});
Then(/^I check login is unsuccessful with text (.*)/, async (text) => {
    await expect(LoginPage.elementContainsText(text)).toBeExisting();
  });