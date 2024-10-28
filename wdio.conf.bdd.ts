// wdio.conf.bdd.ts
import { join } from 'path';
import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    specs: [
        './features/*.feature'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '11',
        'appium:automationName': 'UiAutomator2',
        'appium:app': join(process.cwd(), 'app', 'android', 'Android-MyDemoAppRN.1.3.0.build-244.apk').replace(/\\/g, '/'),
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:newCommandTimeout': 240
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        ['appium', {
            logPath: './logs',
            command: 'appium',
            args: {
                address: '127.0.0.1',
                port: 4723,
                relaxedSecurity: true,
                sessionOverride: true
            }
        }]
    ],
    port: 4723,
    hostname: '127.0.0.1',
    path: '/wd/hub',
    framework: 'cucumber',
    reporters: [
      'spec',
      ['allure', {
          outputDir: 'allure-results',
          disableWebdriverStepsReporting: false,
          disableWebdriverScreenshotsReporting: false,
          addConsoleLogs: true,
          reportedEnvironments: ['PLATFORM', 'DEVICE', 'APP_VERSION'],
      }]
  ],
    cucumberOpts: {
        require: ['./stepDefinitions/*.ts'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    
    // Add hooks for Allure reporting
    beforeSession: async function(config) {
      process.env.DEVICE = process.env.DEVICE_NAME || 'emulator-5554';
      process.env.PLATFORM = process.env.PLATFORM_NAME || 'Android';
      process.env.APP_VERSION = '1.0.0'; // You can make this dynamic
  },

  afterTest: async function(test, context, { error, result, duration, passed, retries }) {
      if (error || !passed) {
          await browser.takeScreenshot();
      }
  }
};