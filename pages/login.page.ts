import BasePage from "./base.page"

class LoginPageObject extends BasePage {
  
    get appMenuElement() { return $('~open menu') }
    get loginMenuElement() { return $('~menu item log in') }
    get userNameInputFieldElement() { return $('~Username input field') }
    get passwordInputFieldElement() { return $('~Password input field') }
    get loginButton() { return $('~Login button') }
    get bagPackElement() { return $("//*[@text='Sauce Labs Backpack']") }
    async elementContainsText(text: string) {
        return  await $(`//*[@text='${text}']`) 
        
        }
    async clickOnAppMenu() {
        await this.appMenuElement.click();
    }

    async clickOnloginMenu() {
        await this.loginMenuElement.click();
    }

    async clickOnLoginButton() {
        await this.loginButton.click();
    }

}
export const LoginPage = new LoginPageObject();