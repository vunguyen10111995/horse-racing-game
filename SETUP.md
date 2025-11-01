# Setup Guide

## Quick Start

Follow these steps to get the Horse Racing Game up and running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16.x or higher

  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm**: Usually comes with Node.js
  - Verify installation: `npm --version`

## Installation Steps

### 1. Navigate to Project Directory

```bash
cd horse-racing-game
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:

- Vue.js 3
- Vuex 4
- Vite
- Vitest
- Playwright
- ESLint

**Installation time**: Approximately 2-5 minutes depending on your internet connection.

### 3. Verify Installation

Check that all dependencies are installed correctly:

```bash
npm list --depth=0
```

You should see all packages listed without errors.

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

**Expected output:**

```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

Open your browser and navigate to `http://localhost:5173/`

**Features in development mode:**

- Hot Module Replacement (HMR)
- Fast refresh
- Source maps for debugging
- Vue DevTools support

### Production Build

Build the application for production:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

**Preview production build:**

```bash
npm run preview
```

## Running Tests

### Unit Tests

Run all unit tests:

```bash
npm run test:unit
```

**Watch mode** (automatically re-run tests on file changes):

```bash
npm run test:unit -- --watch
```

**Coverage report:**

```bash
npm run test:unit -- --coverage
```

### E2E Tests

**Important**: E2E tests require the development server to be running.

**Option 1: Automatic** (Playwright starts the server automatically)

```bash
npm run test:e2e
```

**Option 2: Manual** (if you want to see the app while testing)

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
npm run test:e2e
```

**Interactive mode with UI:**

```bash
npm run test:e2e:ui
```

This opens Playwright's UI for interactive test debugging.

**Run specific test file:**

```bash
npx playwright test e2e/horse-racing-game.spec.js
```

**Run tests in specific browser:**

```bash
npx playwright test --project=chromium
```

## Linting

Check code quality:

```bash
npm run lint
```

**Auto-fix issues:**

```bash
npm run lint -- --fix
```

## Project Structure Overview

After installation, your project structure should look like this:

```
horse-racing-game/
├── node_modules/          # Dependencies (created after npm install)
├── dist/                  # Production build (created after npm run build)
├── e2e/                   # E2E tests
├── src/                   # Source code
│   ├── assets/           # Static assets
│   ├── components/       # Vue components
│   ├── models/           # Business logic
│   ├── store/            # Vuex store
│   ├── App.vue           # Root component
│   └── main.js           # Entry point
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
├── vitest.config.js      # Vitest configuration
├── playwright.config.js  # Playwright configuration
└── README.md             # Project documentation
```

## Troubleshooting

### Issue: npm install fails

**Solution 1**: Clear npm cache

```bash
npm cache clean --force
npm install
```

**Solution 2**: Delete node_modules and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

**Solution 3**: Use different registry

```bash
npm install --registry https://registry.npmjs.org/
```

### Issue: Port 5173 already in use

**Solution 1**: Kill the process using the port

Windows:

```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

Mac/Linux:

```bash
lsof -ti:5173 | xargs kill
```

**Solution 2**: Use a different port

```bash
npm run dev -- --port 3000
```

### Issue: Tests failing

**Solution 1**: Ensure dependencies are installed

```bash
npm install
```

**Solution 2**: Clear test cache

```bash
npm run test:unit -- --clearCache
```

**Solution 3**: For E2E tests, install browsers

```bash
npx playwright install
```

### Issue: ESLint errors

**Solution**: Auto-fix linting issues

```bash
npm run lint -- --fix
```

### Issue: Hot reload not working

**Solution 1**: Restart development server

```bash
# Stop server (Ctrl+C)
npm run dev
```

**Solution 2**: Clear browser cache

- Chrome: Ctrl+Shift+Delete
- Firefox: Ctrl+Shift+Delete
- Safari: Cmd+Option+E

### Issue: Playwright installation fails

**Solution**: Install browsers manually

```bash
npx playwright install chromium firefox webkit
```

## Environment Setup

### VS Code (Recommended)

**Recommended Extensions:**

- Volar (Vue Language Features)
- ESLint
- Prettier
- Playwright Test for VSCode

**Settings** (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "vue"]
}
```

### Browser DevTools

**Vue DevTools:**

- Chrome: [Install from Chrome Web Store](https://chrome.google.com/webstore)
- Firefox: [Install from Firefox Add-ons](https://addons.mozilla.org/firefox)

## Verification Checklist

After setup, verify everything works:

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts the development server
- [ ] Application loads in browser at `http://localhost:5173/`
- [ ] Can see 20 horses displayed
- [ ] "Generate Schedule" button works
- [ ] "Start Race" button works after generating schedule
- [ ] `npm run test:unit` passes all tests
- [ ] `npm run test:e2e` passes all tests
- [ ] `npm run lint` shows no errors
- [ ] `npm run build` creates production build

## Next Steps

Once setup is complete:

1. **Read the documentation:**

   - `README.md` - Project overview
   - `GAME_RULES.md` - Game rules and specifications
   - `ARCHITECTURE.md` - Technical architecture
   - `DEVELOPMENT.md` - Development guide

2. **Explore the code:**

   - Start with `src/App.vue`
   - Check out `src/store/` for state management
   - Look at `src/models/` for business logic

3. **Try the game:**

   - Generate a race schedule
   - Start the races
   - Watch the animations
   - View the results

4. **Run tests:**

   - Unit tests to understand component behavior
   - E2E tests to see user workflows

5. **Make changes:**
   - Modify horse properties
   - Add new features
   - Customize styling

## Getting Help

If you encounter issues:

1. Check this troubleshooting guide
2. Review error messages carefully
3. Check browser console for errors
4. Verify all dependencies are installed
5. Ensure Node.js version is compatible

## System Requirements

### Minimum Requirements:

- **OS**: Windows 10, macOS 10.14, Ubuntu 18.04 or later
- **RAM**: 4GB
- **Disk Space**: 500MB for dependencies
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Recommended:

- **RAM**: 8GB or more
- **Disk Space**: 1GB free space
- **Internet**: Stable connection for npm install

## Performance Tips

### Development:

- Close unnecessary browser tabs
- Use production build for performance testing
- Enable hardware acceleration in browser

### Testing:

- Run unit tests in watch mode during development
- Run E2E tests before committing changes
- Use headed mode for debugging E2E tests

## Security Notes

- Dependencies are regularly updated
- No sensitive data stored
- All data is client-side only
- No external API calls
- Safe to run locally

## License

See LICENSE file for details.

## Support

For questions or issues:

- Check documentation files
- Review test files for examples
- Examine component code
- Read inline comments

---

**Congratulations!** You're now ready to develop and enjoy the Horse Racing Game! 🐴🏁
