# Jupiter Project: Build Commands and Code Style Guidelines

## Build and Test Commands
```bash
# Run all tests
yarn test

# Run a single test file
yarn test __tests__/modules/Moonwalk.test.js

# Run tests with coverage
yarn coverage

# Generate TypeScript type definitions
yarn types

# Run Playwright E2E tests
yarn playwright

# Run Playwright tests with UI
yarn playwright:ui

# Show Playwright test report
yarn playwright:report

# Run specific module tests
yarn playwright:moonwalk    # Test Moonwalk module
yarn playwright:lazyload    # Test Lazyload module
yarn playwright:toggler     # Test Toggler module

# Vite development server (for E2E tests)
yarn vite

# Build for production
yarn vite:build

# Preview production build
yarn vite:preview
```

## Code Style Guidelines

### Imports
- External packages first, then internal modules
- Group imports by type (libraries, Jupiter modules, utils)
- Use named imports for Jupiter events: `import * as Events from '../../events'`

### Formatting
- Use 2-space indentation
- Use single quotes for strings
- No semicolons at the end of statements
- Use ES6 syntax (arrow functions, destructuring, etc.)

### Naming Conventions
- Use camelCase for variables, functions, and methods
- Use PascalCase for classes and class-based components
- Use UPPER_CASE for constants

### Error Handling
- Use proper error logging with console.error including descriptive messages
- Include context information in error messages

### Module Structure
- Each module should be in its own directory under src/modules/
- Export default class from index.js
- Use _defaultsDeep for configuration with sensible defaults
- Register callbacks for lifecycle events via APPLICATION_* events

### Type Definitions
- Use JSDoc annotations for type documentation
- Type interfaces follow module names (e.g., MoonwalkOptions)
- Parameters are typed with standard JSDoc format
- Group modules into categories (Core, Media, Navigation/UI, Animation)
- Use `Partial<Options>` for optional constructor parameters
- All modules have been typed and organized into categories:
  - Core: Application, Breakpoints, Cookies, Dataloader, Dom, FeatureTests, Fontloader
  - Media: HeroSlider, HeroVideo, Lazyload, Lightbox, Marquee
  - Navigation/UI: CoverOverlay, Dropdown, FixedHeader, Links, MobileMenu, Popover, Popup, ScrollSpy, StickyHeader, Toggler, Typography
  - Animation: EqualHeightElements, EqualHeightImages, FooterReveal, Moonwalk, Parallax, StackedBoxes