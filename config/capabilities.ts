import { ANDROID_APP_PATH } from "../static/pathconstants";

export const androidDeviceCapabilities = [
    {
        platformName: "Android",
        "appium:platformVersion": "11",
        "appium:deviceName": "emulator-5554",
        "appium:automationName": "Uiautomator2",
        "appium:app": ANDROID_APP_PATH,
        'appium:noReset': false,
        'appium:newCommandTimeout': 30,
        "appium:autoGrantPermissions": true,
        "appium:avdLaunchTimeout": 180000
    }
]
