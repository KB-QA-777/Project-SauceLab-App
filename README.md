# Mobile Test Automation Framework


This is a mobile test automation framework built using WebdriverIO, Appium, and Cucumber for testing Android applications. The framework follows the Page Object Model design pattern and includes Allure reporting.

## Tech Stack

- **WebdriverIO**: v8.39.1 - Test automation framework
- **Appium**: v2.5.1 - Mobile app automation tool
- **Cucumber**: v8.39.0 - BDD framework
- **TypeScript**: v5.3.3 - Programming language
- **Allure**: v2.29.0 - Reporting


## Prerequisites

1. Node.js (v16 or higher)
2. Java Development Kit (JDK)
3. Android SDK
4. Appium
5. Android Emulator or Real Device

## Environment Setup

### 1. Install Node.js Dependencies

```bash
npm install
```

### 2. Android SDK Setup

Set the following environment variables:
- `ANDROID_HOME`: Path to Android SDK
- `JAVA_HOME`: Path to JDK installation

Add to PATH:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

### 3. Appium Setup

```bash
npm install -g appium
appium-doctor --android  # To verify setup
appium driver install uiautomator2
```

### 4. Create Android Virtual Device (Optional)

1. Open Android Studio
2. Go to Tools > AVD Manager
3. Create Virtual Device
4. Select Device Definition (e.g., Pixel 3)
5. Select System Image (e.g., API 30)

## Project Structure

```
├── app
│   └── android/                  # Android app files (.apk)
├── config/                       # Configuration files
├── features/                     # Cucumber feature files
├── pages/                        # Page Object files
├── stepDefinitions/             # Step definition files
├── test-results/               # Test execution results
├── allure-results/            # Allure results
├── allure-report/             # Generated Allure report
├── package.json               # Project dependencies
├── tsconfig.json             # TypeScript configuration
└── wdio.conf.bdd.ts          # WebdriverIO configuration
```

## Running Tests

### 1. Start Appium Server
```bash
npm run appium:start
```

### 2. Start Android Emulator
```bash
# Verify device is connected
adb devices
```

### 3. Run Tests
```bash
# Run all tests
npm test

# View Allure report
npm run report
```

## Available Scripts

- `npm test` - Run all tests
- `npm run clean` - Clean test results
- `npm run report` - Generate and open Allure report
- `npm run appium:start` - Start Appium server
- `npm run appium:stop` - Stop Appium server

## Writing Tests

### 1. Feature File Example
```gherkin
Feature: Login Functionality

  Scenario Outline: User attempts to login with different credentials
    When I clicked on App Menu
    Then I clicked on login Menu option
    Then I enter username as <username> and password as <password>
    When I clicked on login button
    Then I should see <result>

    Examples:
      | username          | password | result                          |
      | alice@example.com | 10203040 | I check login is unsuccessful with text Sorry, this user has been locked out. |
```

### 2. Step Definition Example
```typescript
When(/^I clicked on App Menu$/, async function() {
    await LoginPage.clickOnAppMenu();
});
```

### 3. Page Object Example
```typescript
class LoginPageObject extends BasePage {
    get appMenuElement() { 
        return $('~open menu'); 
    }

    async clickOnAppMenu() {
        await (await this.appMenuElement).click();
    }
}
```

## Reports

The framework generates Allure reports that include:
- Test execution summary
- Step-by-step execution details
- Screenshots of failures
- Environment information
- Test execution timeline

## Best Practices

1. Follow Page Object Model
2. Write reusable functions in Base Page
3. Keep step definitions simple
4. Use meaningful names for selectors
5. Add proper error handling
6. Include appropriate waits
7. Add comments for complex logic

## Troubleshooting

1. **Appium Connection Issues**
   - Verify Appium server is running
   - Check port availability
   - Verify device is connected

2. **Element Not Found**
   - Check locator strategy
   - Add appropriate waits
   - Verify element visibility

3. **Test Execution Issues**
   - Check app installation
   - Verify app permissions
   - Check device settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements

- [ ] Add iOS support
- [ ] Implement parallel execution
- [ ] Add API integration
- [ ] Add data-driven testing
- [ ] Implement CI/CD integration

## Author
Kartik Bhargava
