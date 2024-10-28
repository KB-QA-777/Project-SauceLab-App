// config/reporter.hooks.ts
import allure from '@wdio/allure-reporter';
import { Status } from 'allure-js-commons';

class AllureReporter {
    static async addFeatureInfo(feature: string) {
        allure.addFeature(feature);
    }

    static async addEnvironmentInfo() {
        const capabilities = browser.capabilities;
        allure.addEnvironment('Platform', capabilities.platformName);
        allure.addEnvironment('Device', capabilities.deviceName);
        allure.addEnvironment('App Version', process.env.APP_VERSION || 'Unknown');
        allure.addEnvironment('Environment', process.env.TEST_ENV || 'Test');
        allure.addEnvironment('Appium Version', process.env.APPIUM_VERSION || 'Unknown');
    }

    static async addTestInfo(testName: string, description?: string) {
        if (description) {
            allure.addDescription(description);
        }
        allure.addTestId(`TC-${Date.now()}`);
    }

    static async addScreenshot(name: string) {
        const screenshot = await browser.takeScreenshot();
        allure.addAttachment(name, Buffer.from(screenshot, 'base64'), 'image/png');
    }

    static async addVideoAttachment() {
        // If you have video recording capability
        // allure.addAttachment('Video', Buffer.from(videoBuffer), 'video/mp4');
    }

    static async addExecutionDetails(status: Status, error?: Error) {
        if (error) {
            allure.addDescription(`Error: ${error.message}\n\nStack: ${error.stack}`);
        }

        const duration = Date.now() - global.testStartTime;
        allure.addParameter('duration', 'Number', duration);
    }
}

export { AllureReporter };