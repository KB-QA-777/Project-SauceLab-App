# Mobile Testing Project

This project is set up for mobile application testing using WebdriverIO, Appium, and Cucumber. It's configured for Android testing with support for Allure reporting.

## Prerequisites

- Node.js and npm
- Android SDK
- Appium
- Java Development Kit (JDK)

## Setup

### 1. Install Appium Server

```bash
npm install -g appium
npm install -g appium-doctor
appium --version
```

### 2. Verify and Install Drivers

```bash
appium driver list
appium driver install uiautomator2
appium driver install xcuitest
```

### 3. Setup Android SDK Path

Set the following environment variables:

- `ANDROID_HOME = <path to Sdk folder>`
- Add to PATH:
  - `%ANDROID_HOME%\tools`
  - `%ANDROID_HOME%\tools\bin`
  - `%ANDROID_HOME%\platform-tools`

### 4. Create Virtual Device (Android Studio)

1. Open Android Studio
2. Click on More Actions -> AVD Manager -> Create Virtual Device
3. Select the device (e.g., Pixel 3) and OS version (e.g., Android 11)
4. Launch the AVD in the emulator
5. Verify with `adb devices`

### 5. Verify Setup

```bash
appium-doctor --android
```

Ensure all checks pass (green).

## Project Structure

- `app/android/`: Android .apk file
- `config/`: WebdriverIO and capabilities configurations
- `features/`: Cucumber feature files
- `pages/`: Page Object Model (POM) classes
- `static/`: Constants and path constants
- `stepDefinitions/`: Cucumber step definitions
- `test-results/`: Test results and reports

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

## Running Tests

To run the tests:

```bash
npm test
```

This command will execute the WebdriverIO tests using Cucumber.

## Generating Reports

To generate and view the Allure report:

```bash
npm run allure-report
```

The report will be available at `http://YourMachineIP:5050/` and locally at `./allure-report/index.html`.

## Configuration

- `wdio.conf.bdd.ts`: WebdriverIO configuration file
- `tsconfig.json`: TypeScript configuration
- `capabilities.ts`: Device capabilities for testing

## Key Files

- `constants.ts`: Application constants
- `pathconstants.ts`: File path constants
- `login.ts`: Login step definitions
- `base.page.ts`: Base page object with common functions
- `login.page.ts`: Login page object

## Scripts

- `npm test`: Run tests
- `npm run allure-report`: Generate Allure report
- `npm run allure:history`: Prepare history for Allure report

## Test Execution Recording
The project includes a video recording (Recording #1.mp4) that demonstrates the execution of test cases.