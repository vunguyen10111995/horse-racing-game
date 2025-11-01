# E2E Testing Guide

## Overview

This project uses **Playwright** for End-to-End (E2E) testing. Playwright tests run in real browsers to simulate actual user interactions.

---

## Prerequisites

### 1. Install Playwright Browsers (First Time Only)

Before running E2E tests for the first time, you need to install the browser binaries:

```bash
npx playwright install
```

This will download Chromium, Firefox, and WebKit browsers (~500MB).

**Optional: Install specific browsers only:**

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

---

## Running E2E Tests

### Method 1: Standard E2E Test Run (Headless)

Run all E2E tests in headless mode (no browser window visible):

```bash
npm run test:e2e
```

**What happens:**

- ✅ Automatically starts dev server (`npm run dev`)
- ✅ Runs tests in all configured browsers (Chromium, Firefox, WebKit, Mobile)
- ✅ Tests run in parallel for speed
- ✅ Generates HTML report
- ✅ Automatically stops dev server when done

**Output:**

```
Running 10 tests using 5 workers
  10 passed (30s)

To open last HTML report run:
  npx playwright show-report
```

---

### Method 2: E2E Test UI Mode (Interactive) ⭐ RECOMMENDED

Run tests with Playwright's interactive UI:

```bash
npm run test:e2e:ui
```

**What happens:**

- 🎨 Opens Playwright UI in your browser
- 👁️ Watch tests run in real-time
- 🔍 Inspect each step visually
- ⏯️ Pause, step through, and debug tests
- 📸 View screenshots and traces
- 🎯 Run specific tests or browsers

**Benefits:**

- **Visual Debugging**: See exactly what the test is doing
- **Time Travel**: Step backward and forward through test steps
- **Pick & Choose**: Run only the tests you want
- **Browser Selection**: Test on specific browsers
- **Live Reload**: Tests auto-reload on file changes

---

## E2E Test Commands Reference

### Basic Commands

```bash
# Run all E2E tests (headless)
npm run test:e2e

# Run with UI (interactive mode)
npm run test:e2e:ui

# Run in headed mode (see browser window)
npx playwright test --headed

# Run specific test file
npx playwright test e2e/horse-racing-game.spec.js

# Run specific test by name
npx playwright test -g "should generate schedule"
```

### Browser-Specific Commands

```bash
# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run on mobile
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Debugging Commands

```bash
# Debug mode (opens browser with inspector)
npx playwright test --debug

# Debug specific test
npx playwright test e2e/horse-racing-game.spec.js --debug

# Generate trace for debugging
npx playwright test --trace on
```

### Report Commands

```bash
# Show last test report
npx playwright show-report

# Generate and show report
npx playwright test --reporter=html
npx playwright show-report
```

---

## E2E Test Configuration

### Current Setup (`playwright.config.js`)

```javascript
{
  testDir: "./e2e",              // E2E tests location
  baseURL: "http://localhost:5173", // Dev server URL

  // Browsers to test
  projects: [
    "Desktop Chrome",
    "Desktop Firefox",
    "Desktop Safari",
    "Mobile Chrome (Pixel 5)",
    "Mobile Safari (iPhone 12)"
  ],

  // Auto-start dev server
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173"
  }
}
```

---

## E2E Test Files

### Current Test Suites

1. **`e2e/horse-racing-game.spec.js`**

   - Core game functionality
   - Generate schedule
   - Start race
   - View results
   - Complete game flow

2. **`e2e/responsive.spec.js`**
   - Desktop layouts (1920x1080, 1366x768)
   - Tablet layouts (768x1024)
   - Mobile layouts (375x667)

---

## Step-by-Step: Running E2E Tests

### Option A: Quick Test Run

1. Open terminal in project directory
2. Run:
   ```bash
   npm run test:e2e
   ```
3. Wait for tests to complete
4. View report:
   ```bash
   npx playwright show-report
   ```

### Option B: Interactive UI Mode (Best for Development)

1. Open terminal in project directory
2. Run:
   ```bash
   npm run test:e2e:ui
   ```
3. Playwright UI opens in browser
4. Click on any test to run it
5. Watch it execute in real-time
6. Inspect results and screenshots

---

## Troubleshooting

### Issue: "Executable doesn't exist"

**Solution:** Install Playwright browsers

```bash
npx playwright install
```

### Issue: "Port 5173 is already in use"

**Solution:** Stop any running dev server

```bash
# Windows PowerShell
Get-Process -Name node | Stop-Process

# Or just close the terminal running dev server
```

### Issue: "Tests timeout"

**Solution:** Increase timeout in `playwright.config.js`

```javascript
use: {
  timeout: 60000, // 60 seconds
}
```

### Issue: "Cannot find module"

**Solution:** Reinstall dependencies

```bash
npm install
npx playwright install
```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Best Practices

### 1. Use UI Mode for Development

- Faster debugging
- Visual feedback
- Easy test selection

### 2. Run Headless in CI/CD

- Faster execution
- No GUI overhead
- Automated reports

### 3. Test on Multiple Browsers

- Ensure cross-browser compatibility
- Catch browser-specific bugs

### 4. Use Specific Selectors

- Prefer data-testid over classes
- Avoid brittle selectors
- Use semantic HTML

### 5. Keep Tests Independent

- Each test should work alone
- Don't rely on test order
- Clean up after tests

---

## Quick Reference Card

| Task                  | Command                                  |
| --------------------- | ---------------------------------------- |
| **First time setup**  | `npx playwright install`                 |
| **Run all E2E tests** | `npm run test:e2e`                       |
| **Interactive UI**    | `npm run test:e2e:ui` ⭐                 |
| **Debug mode**        | `npx playwright test --debug`            |
| **Specific browser**  | `npx playwright test --project=chromium` |
| **View report**       | `npx playwright show-report`             |
| **Headed mode**       | `npx playwright test --headed`           |
| **Update snapshots**  | `npx playwright test --update-snapshots` |

---

## Example: Running Your First E2E Test

### Step 1: Install browsers (if not done)

```bash
npx playwright install
```

### Step 2: Run in UI mode

```bash
npm run test:e2e:ui
```

### Step 3: In the Playwright UI

1. Click on "horse-racing-game.spec.js"
2. Click on "should load the application"
3. Watch the test run!
4. See green checkmark ✅

### Step 4: View results

- Click on any test step to see details
- View screenshots
- Check console logs
- Inspect network requests

---

## Summary

**For Development:**

```bash
npm run test:e2e:ui
```

Use this for writing and debugging tests. It's interactive and visual!

**For CI/CD:**

```bash
npm run test:e2e
```

Use this for automated testing. It's fast and generates reports!

**Need Help?**

- Playwright Docs: https://playwright.dev
- Playwright Discord: https://aka.ms/playwright/discord

Happy Testing! 🎭✨
