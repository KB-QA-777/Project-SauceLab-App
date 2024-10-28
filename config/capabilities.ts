// config/capabilities.ts
import path from 'path';

export const androidDeviceCapabilities = [{
    platformName: 'Android',
    maxInstances: 1,
    'appium:deviceName': 'emulator-5554',
    'appium:platformVersion': '11',
    'appium:automationName': 'UiAutomator2',
    'appium:app': path.join(process.cwd(), './app/android/Android-MyDemoAppRN.1.3.0.build-244.apk'),
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:newCommandTimeout': 240
}];