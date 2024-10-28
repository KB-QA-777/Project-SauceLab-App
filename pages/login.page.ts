// pages/login.page.ts
import BasePage from "./base.page";

class LoginPageObject extends BasePage {
    get appMenuElement() { return $('~open menu'); }
    get loginMenuElement() { return $('~menu item log in'); }
    get userNameInputFieldElement() { return $('~Username input field'); }
    get passwordInputFieldElement() { return $('~Password input field'); }
    get loginButton() { return $('~Login button'); }
    get bagPackElement() { return $("//*[@text='Sauce Labs Backpack']"); }

    async elementContainsText(text: string) {
        return await $(`//*[@text='${text}']`);
    }

    async clickOnAppMenu() {
        await (await this.appMenuElement).click();
    }

    async clickOnloginMenu() {
        await (await this.loginMenuElement).click();
    }

    async verifySuccessfulLogin() {
        await (await this.bagPackElement).waitForDisplayed({ timeout: 5000 });
    }

    async verifyUnsuccessfulLogin(errorText: string) {
        const errorElement = await this.elementContainsText(errorText);
        await errorElement.waitForDisplayed({ timeout: 5000 });
    }
}

export const LoginPage = new LoginPageObject();