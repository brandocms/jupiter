# Jupiter TypeScript Definitions

This directory contains TypeScript declaration files (.d.ts) for Jupiter modules.

## Using Type Definitions

When importing Jupiter modules, you'll get autocomplete and type checking for options:

```javascript
import { Moonwalk } from '@brandocms/jupiter';

// Options object will have autocomplete
const moonwalk = new Moonwalk(app, {
  clearNestedSections: true,
  rootMargin: '-5% 0%',
  walks: {
    // Autocomplete for walk properties
    default: {
      interval: 0.1,
      duration: 0.5
    }
  }
});
```

## Available Typed Modules

The following modules have TypeScript definitions:

### Core Modules
- **Application** - Main application controller
- **Breakpoints** - Responsive design and media query handling
- **Dom** - DOM utility functions

### Media Modules
- **Lazyload** - Image lazy loading functionality
- **Lightbox** - Image gallery overlay
- **HeroVideo** - Background video with controls

### Navigation and UI Modules
- **Links** - Navigation and page transitions
- **Popup** - Modal dialogs and popups
- **Toggler** - Show/hide component for collapsible content

### Animation Modules
- **Parallax** - Parallax scrolling effect for background images
- **Moonwalk** - Animation system for element reveals

## Adding Type Definitions for a New Module

1. **Create JSDoc annotations** in your source file (src/modules/YourModule/index.js):

```javascript
/**
 * @typedef {Object} YourModuleOptions
 * @property {boolean} [someOption=false] - Description of the option
 * @property {number} [anotherOption=10] - Description of another option
 */

/** @type {YourModuleOptions} */
const DEFAULT_OPTIONS = {
  someOption: false,
  anotherOption: 10
};

/**
 * Your module description
 */
export default class YourModule {
  /**
   * @param {Object} app - Application instance
   * @param {YourModuleOptions} [opts={}] - Configuration options
   */
  constructor(app, opts = {}) {
    // ...
  }
  
  /**
   * @param {string} someParam - Parameter description
   * @returns {boolean} Return value description
   */
  someMethod(someParam) {
    // ...
  }
}
```

2. **Create a TypeScript declaration file** in types/modules/YourModule/index.d.ts:

```typescript
/**
 * Types for YourModule
 */
import Application from '../Application';

/**
 * YourModule options
 */
export interface YourModuleOptions {
  /** Description of the option */
  someOption?: boolean;
  
  /** Description of another option */
  anotherOption?: number;
}

/**
 * Your module description
 */
export default class YourModule {
  /** Application instance */
  app: Application;
  
  /** Module options */
  opts: YourModuleOptions;
  
  /**
   * Create a new YourModule instance
   * @param app - Application instance
   * @param opts - YourModule options
   */
  constructor(app: Application, opts?: Partial<YourModuleOptions>);
  
  /**
   * Method description
   * @param someParam - Parameter description
   * @returns Return value description
   */
  someMethod(someParam: string): boolean;
}
```

3. **Update the main index.d.ts file** to export your new module:

```typescript
export {
  default as YourModule,
  YourModuleOptions
} from './modules/YourModule';
```

Place this export in the appropriate section (Core, Media, Navigation/UI, or Animation).

## Typing Guidelines

- Use `Partial<Options>` for optional constructor parameters
- Use descriptive JSDoc comments for all properties and methods
- Group related interfaces together (e.g., options and element interfaces)
- Always import `Application` from '../Application'
- Use consistent naming patterns:
  - `ModuleOptions` for options interfaces
  - `ModuleElements` for element collections
  - Use camelCase for methods and properties

## Running Type Checking

Run `yarn types` to generate and check type definitions.

If there are errors, don't worry about typechecking passing completely. The primary goal is to provide autocomplete and documentation for developers.