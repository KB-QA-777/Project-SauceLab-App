import { APP_PACKAGE } from "../static/constants";

export default class BasePage {
    protected async clickElement(selector: string): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed();
        await element.click();
    }

    protected async setValue(selector: string, value: string): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed();
        await element.setValue(value);
    }

    protected async waitForElementDisplayed(selector: string, timeout = 5000): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout });
    }

    protected async waitForTextPresent(text: string, timeout = 5000): Promise<void> {
        const selector = `//*[@text='${text}']`;
        await this.waitForElementDisplayed(selector, timeout);
    }

    protected findByTextContains(partialText: string): Promise<WebdriverIO.Element> {
        return $(`android=new UiSelector().textContains("${partialText}")`);
    }

    protected async scrollAndClickByText(text: string): Promise<void> {
        await $(`android=new UiScrollable(new UiSelector()).scrollTextIntoView("${text}")`).click();
    }

    protected async scrollHorizontally(swipes = 2): Promise<void> {
        await $(`android=new UiScrollable(new UiSelector()).setAsHorizontalList().scrollForward(${swipes})`);
    }

    protected async openUsingPackage(activityName: string): Promise<void> {
        await driver.startActivity(APP_PACKAGE, activityName);
    }

    protected async takeScreenshot(name?: string): Promise<void> {
        await browser.saveScreenshot(`./test-results/screenshots/${name || 'error'}-${Date.now()}.png`);
    }

    // Updated app termination method
    protected async terminateApp(): Promise<void> {
        try {
            await driver.execute('mobile: terminateApp', { bundleId: APP_PACKAGE });
        } catch (error) {
            console.warn('Could not terminate app:', error.message);
        }
    }

    // Updated app reset method
    protected async resetApp(): Promise<void> {
        try {
            await driver.reset();
        } catch (error) {
            console.warn('Could not reset app:', error.message);
            // Fallback: terminate and activate
            await this.terminateApp();
            await driver.activateApp(APP_PACKAGE);
        }
    }
}