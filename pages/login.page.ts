// pages/login.page.ts
import BasePage from "./base.page";

/**
 * Login Page Object containing all login-related elements and methods
 * Extends BasePage to inherit common functionality
 */
class LoginPageObject extends BasePage {
    /**
     * Page element selectors using accessibility IDs and XPaths
     * @private
     */
    private readonly selectors = {
        appMenu: '~open menu',
        loginMenu: '~menu item log in',
        usernameField: '~Username input field',
        passwordField: '~Password input field',
        loginButton: '~Login button',
        backpackProduct: "//*[@text='Sauce Labs Backpack']"
    };

    /**
     * Gets app menu element
     * @returns Promise resolving to WebdriverIO Element
     */
    get appMenuElement() { return $(this.selectors.appMenu); }

    /**
     * Gets login menu element
     * @returns Promise resolving to WebdriverIO Element
     */
    get loginMenuElement() { return $(this.selectors.loginMenu); }

    /**
     * Gets username input field element
     * @returns Promise resolving to WebdriverIO Element
     */
    get userNameInputFieldElement() { return $(this.selectors.usernameField); }

    /**
     * Gets password input field element
     * @returns Promise resolving to WebdriverIO Element
     */
    get passwordInputFieldElement() { return $(this.selectors.passwordField); }

    /**
     * Gets login button element
     * @returns Promise resolving to WebdriverIO Element
     */
    get loginButton() { return $(this.selectors.loginButton); }

    /**
     * Gets backpack element (indicates successful login)
     * @returns Promise resolving to WebdriverIO Element
     */
    get bagPackElement() { return $(this.selectors.backpackProduct); }

    /**
     * Finds element containing specific text
     * @param text - Text to find
     * @returns Promise resolving to WebdriverIO Element
     */
    async elementContainsText(text: string) {
        return await $(`//*[@text='${text}']`);
    }

    /**
     * Clicks on app menu
     * @throws {Error} If menu element is not clickable
     */
    async clickOnAppMenu(): Promise<void> {
        await this.clickElement(this.selectors.appMenu);
    }

    /**
     * Clicks on login menu option
     * @throws {Error} If login menu element is not clickable
     */
    async clickOnloginMenu(): Promise<void> {
        await this.clickElement(this.selectors.loginMenu);
    }

    /**
     * Enters login credentials
     * @param username - Username to enter
     * @param password - Password to enter
     * @throws {Error} If fields are not interactable
     */
    async enterCredentials(username: string, password: string): Promise<void> {
        await this.setValue(this.selectors.usernameField, username);
        await this.setValue(this.selectors.passwordField, password);
    }

    /**
     * Verifies successful login by checking for backpack element
     * @throws {Error} If backpack element is not visible
     */
    async verifySuccessfulLogin(): Promise<void> {
        await this.waitForElementDisplayed(this.selectors.backpackProduct);
    }

    /**
     * Verifies unsuccessful login by checking error message
     * @param errorText - Expected error message
     * @throws {Error} If error message is not visible
     */
    async verifyUnsuccessfulLogin(errorText: string): Promise<void> {
        await this.waitForTextPresent(errorText);
    }

    /**
     * Resets app to initial state
     * Terminates and restarts the app
     */
    async resetApp(): Promise<void> {
        await this.terminateApp();
        await driver.activateApp('com.saucelabs.mydemoapp.rn');
    }

    /**
     * Gets current error message text if present
     * @returns Promise resolving to error message text
     * @throws {Error} If no error message is present
     */
    async getErrorMessage(): Promise<string> {
        const errorElement = await $('//android.widget.TextView[contains(@text, "error")]');
        return await errorElement.getText();
    }
}

export const LoginPage = new LoginPageObject();