// pages/base.page.ts
import { APP_PACKAGE } from "../static/constants";

/**
 * Base Page class providing common methods and utilities for page objects
 * Contains reusable methods for element interaction, app management, and utilities
 */
export default class BasePage {
    /**
     * Finds and clicks on an element using the provided selector
     * @param selector - Element locator strategy (e.g., accessibility id, xpath)
     * @throws {Error} If element is not found or not clickable
     * @example await clickElement('~submit-button')
     */
    protected async clickElement(selector: string): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed();
        await element.click();
    }

    /**
     * Sets value for an input field with automatic clearing
     * @param selector - Element locator strategy
     * @param value - Text to be entered in the field
     * @throws {Error} If element is not found or not interactable
     * @example await setValue('~username-input', 'testuser')
     */
    protected async setValue(selector: string, value: string): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed();
        await element.setValue(value);
    }

    /**
     * Waits for an element to be displayed on screen
     * @param selector - Element locator strategy
     * @param timeout - Maximum time to wait in milliseconds (default: 5000)
     * @throws {Error} If element is not visible within timeout
     * @example await waitForElementDisplayed('~loading-spinner', 10000)
     */
    protected async waitForElementDisplayed(selector: string, timeout = 5000): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Waits for text to be present on screen
     * @param text - Text to wait for
     * @param timeout - Maximum time to wait in milliseconds
     * @throws {Error} If text is not found within timeout
     * @example await waitForTextPresent('Welcome', 5000)
     */
    protected async waitForTextPresent(text: string, timeout = 5000): Promise<void> {
        const selector = `//*[@text='${text}']`;
        await this.waitForElementDisplayed(selector, timeout);
    }

    /**
     * Finds element by partial text using UiSelector
     * @param partialText - Partial text to search for
     * @returns WebdriverIO Element
     * @example await findByTextContains('Welcome')
     */
    protected findByTextContains(partialText: string): Promise<WebdriverIO.Element> {
        return $(`android=new UiSelector().textContains("${partialText}")`);
    }

    /**
     * Scrolls to element with text and clicks it
     * @param text - Text to scroll to
     * @throws {Error} If text is not found after scrolling
     * @example await scrollAndClickByText('Submit')
     */
    protected async scrollAndClickByText(text: string): Promise<void> {
        await $(`android=new UiScrollable(new UiSelector()).scrollTextIntoView("${text}")`).click();
    }

    /**
     * Performs horizontal scroll on list
     * @param swipes - Number of forward swipes (default: 2)
     * @example await scrollHorizontally(3)
     */
    protected async scrollHorizontally(swipes = 2): Promise<void> {
        await $(`android=new UiScrollable(new UiSelector()).setAsHorizontalList().scrollForward(${swipes})`);
    }

    /**
     * Opens app using package name
     * @param activityName - Activity name to launch
     * @example await openUsingPackage('com.example.MainActivity')
     */
    protected async openUsingPackage(activityName: string): Promise<void> {
        await driver.startActivity(APP_PACKAGE, activityName);
    }

    /**
     * Takes screenshot and saves with timestamp
     * @param name - Base name for screenshot file
     * @returns Full path to saved screenshot
     * @example await takeScreenshot('login-error')
     */
    protected async takeScreenshot(name?: string): Promise<void> {
        await browser.saveScreenshot(`./test-results/screenshots/${name || 'error'}-${Date.now()}.png`);
    }

    /**
     * Terminates the app
     * @returns Promise resolving to true if app was terminated
     * @example await terminateApp()
     */
    protected async terminateApp(): Promise<void> {
        try {
            await driver.execute('mobile: terminateApp', { bundleId: APP_PACKAGE });
        } catch (error) {
            console.warn('Could not terminate app:', error.message);
        }
    }

    /**
     * Checks if element is visible on screen
     * @param selector - Element locator strategy
     * @returns Promise resolving to boolean
     * @example await isElementVisible('~error-message')
     */
    protected async isElementVisible(selector: string): Promise<boolean> {
        try {
            const element = await $(selector);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Gets text from element
     * @param selector - Element locator strategy
     * @returns Promise resolving to element text
     * @throws {Error} If element is not found
     * @example await getElementText('~user-name')
     */
    protected async getElementText(selector: string): Promise<string> {
        const element = await $(selector);
        await element.waitForDisplayed();
        return element.getText();
    }
}