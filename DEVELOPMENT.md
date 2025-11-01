# Development Guide

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd horse-racing-game
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Development Workflow

### Running the Application

**Development Mode**

```bash
npm run dev
```

- Hot module replacement enabled
- Source maps for debugging
- Fast refresh for Vue components

**Production Build**

```bash
npm run build
```

- Optimized bundle
- Minified code
- Tree-shaking applied

**Preview Production Build**

```bash
npm run preview
```

### Testing

**Unit Tests**

```bash
npm run test:unit
```

- Runs Vitest test suite
- Tests models, store, and components
- Watch mode available with `npm run test:unit -- --watch`

**E2E Tests**

```bash
npm run test:e2e
```

- Runs Playwright tests
- Tests full user workflows
- Multiple browser testing

**E2E Tests with UI**

```bash
npm run test:e2e:ui
```

- Opens Playwright UI
- Interactive test debugging
- Visual test execution

### Code Quality

**Linting**

```bash
npm run lint
```

- ESLint for JavaScript/Vue
- Auto-fix available with `npm run lint -- --fix`

## Project Structure Explained

### `/src/models`

Business logic and data models

- Pure JavaScript classes
- No Vue dependencies
- Fully testable

### `/src/store`

Vuex state management

- Modular store structure
- Namespaced modules
- Actions for async operations

### `/src/components`

Vue components

- Single File Components (.vue)
- Scoped styles
- Composition API

### `/src/assets`

Static assets

- Global CSS
- Images (if any)
- Fonts (if any)

## Adding New Features

### Adding a New Horse Property

1. Update Horse model (`src/models/Horse.js`)

```javascript
export class Horse {
  constructor(id, name, color, condition, newProperty) {
    // ... existing properties
    this.newProperty = newProperty;
  }
}
```

2. Update horse generation

```javascript
export function generateHorses(count = 20) {
  // ... generate newProperty value
}
```

3. Update HorseList component to display new property

4. Add tests for new functionality

### Adding a New Race Type

1. Update Race model (`src/models/Race.js`)

```javascript
export const RACE_TYPES = {
  SPRINT: "sprint",
  MARATHON: "marathon",
};
```

2. Update race generation logic

3. Update RaceSchedule component

4. Add corresponding tests

### Adding New UI Components

1. Create component file in `/src/components`

```vue
<template>
  <!-- Your template -->
</template>

<script>
export default {
  name: "YourComponent",
  setup() {
    // Your logic
  },
};
</script>

<style scoped>
/* Your styles */
</style>
```

2. Import and use in parent component

3. Create test file in `/src/components/__tests__`

## State Management Guidelines

### When to Use Vuex

**DO use Vuex for:**

- Shared state across multiple components
- Complex state transformations
- State that needs to be persisted
- State that changes frequently

**DON'T use Vuex for:**

- Component-local state
- Temporary UI state
- Form input values (unless needed globally)

### Store Module Pattern

```javascript
// State
const state = () => ({
  // Initial state
});

// Getters (computed properties)
const getters = {
  // Derived state
};

// Mutations (synchronous state changes)
const mutations = {
  // State modifications
};

// Actions (async operations)
const actions = {
  // Business logic
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
```

## Component Guidelines

### Composition API Best Practices

```javascript
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "MyComponent",
  setup() {
    const store = useStore();

    // Reactive state
    const localState = ref(0);

    // Computed properties
    const derivedState = computed(() => {
      return store.getters["module/getter"];
    });

    // Methods
    const handleAction = () => {
      store.dispatch("module/action");
    };

    // Lifecycle
    onMounted(() => {
      // Initialization
    });

    return {
      localState,
      derivedState,
      handleAction,
    };
  },
};
```

### Component Communication

1. **Parent to Child**: Props
2. **Child to Parent**: Events
3. **Sibling to Sibling**: Vuex store
4. **Deeply Nested**: Vuex store or provide/inject

## Styling Guidelines

### CSS Organization

1. **Global Styles**: `/src/assets/styles/main.css`

   - Reset/normalize
   - Typography
   - Utility classes

2. **Component Styles**: Scoped in component files
   - Component-specific styles
   - Use scoped attribute
   - BEM naming convention

### Responsive Design

```css
/* Mobile first approach */
.component {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
  }
}
```

## Testing Guidelines

### Unit Test Structure

```javascript
import { describe, it, expect, beforeEach } from "vitest";

describe("Feature Name", () => {
  beforeEach(() => {
    // Setup
  });

  it("should do something", () => {
    // Arrange
    const input = "test";

    // Act
    const result = functionToTest(input);

    // Assert
    expect(result).toBe("expected");
  });
});
```

### E2E Test Structure

```javascript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should do something", async ({ page }) => {
    // Interact with page
    await page.click(".button");

    // Assert
    await expect(page.locator(".result")).toBeVisible();
  });
});
```

## Debugging Tips

### Vue Devtools

- Install Vue Devtools browser extension
- Inspect component hierarchy
- View Vuex state and mutations
- Time-travel debugging

### Console Logging

```javascript
// Development only
if (process.env.NODE_ENV !== "production") {
  console.log("Debug info:", data);
}
```

### Breakpoints

- Use browser DevTools
- Set breakpoints in source files
- Inspect variables and call stack

## Common Issues

### Issue: Hot reload not working

**Solution**: Restart dev server, clear browser cache

### Issue: Tests failing randomly

**Solution**: Check for timing issues, add proper waits

### Issue: Styles not applying

**Solution**: Check scoped attribute, verify CSS specificity

### Issue: State not updating

**Solution**: Verify mutations are called, check reactivity

## Performance Optimization

### Bundle Size

- Use code splitting
- Lazy load routes/components
- Tree-shake unused code

### Runtime Performance

- Use computed properties
- Avoid unnecessary re-renders
- Optimize animations with CSS transforms

### Development Performance

- Use Vite's fast HMR
- Minimize dependencies
- Use production builds for testing

## Contributing

1. Create feature branch
2. Make changes
3. Write/update tests
4. Run linter
5. Submit pull request

## Resources

- [Vue.js Documentation](https://vuejs.org/)
- [Vuex Documentation](https://vuex.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
