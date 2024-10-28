// config/reporter.config.ts
import { AllureReporterOptions } from '@wdio/allure-reporter';

export const allureReporterConfig: AllureReporterOptions = {
    outputDir: './test-results/reports/allure-results',
    disableWebdriverStepsReporting: false,
    disableWebdriverScreenshotsReporting: false,
    addConsoleLogs: true,
    reportedEnvironments: ['Android', 'iOS'],
    useCucumberStepReporter: true,
    addDescriptionToName: true,
    issueLinkTemplate: "https://your-jira-instance/browse/{}",
    tmsLinkTemplate: "https://your-test-management-system/test-cases/{}",
    categories: [
        {
            name: 'Authentication Issues',
            messageRegex: '.*Authentication.*|.*login failed.*',
            matchedStatuses: ['failed']
        },
        {
            name: 'UI Element Issues',
            messageRegex: '.*element not interactable.*|.*no such element.*',
            matchedStatuses: ['failed', 'broken']
        },
        {
            name: 'Performance Issues',
            messageRegex: '.*timeout.*|.*performance.*',
            matchedStatuses: ['failed', 'broken']
        }
    ]
};