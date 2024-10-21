import { androidDeviceCapabilities } from './config/capabilities';
import { JSON_OUTPUT_DIR } from "../mobile/static/pathconstants";
import type { Options } from '@wdio/types';

exports.config = {
  // =====================
  // ts-node Configurations
  // =====================
  runner: 'local',
  port: 4723,
  specs: [
    './features/*.feature',
  ],

  exclude: [
  ],
  capabilities: androidDeviceCapabilities,
  logLevel: 'info',
  baseUrl: 'http://localhost',
  waitforTimeout: 15000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['appium'],
  appium: {
    command: 'appium',
    args: {
      port: 4724
    }
  },
  framework: 'cucumber',
  reporters: [
    'spec',
    ['allure', {
      outputDir: './test-results/reports/allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }]
  ],
    // outputDir: path.resolve(__dirname, 'logs'),
    cucumberOpts: {
      require: ['./stepDefinitions/*.ts'],
      backtrace: true,
      dryRun: false,
      failFast: false,
      format: ['pretty'],
      colors: true,
      snippets: true,
      source: true,
      profile: [],
      strict: true,
      timeout: 20000,
      ignoreUndefinedDefinitions: false,
    },

  };
