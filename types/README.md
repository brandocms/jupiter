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
  /**
   * Create a new YourModule instance
   * @param app - Application instance
   * @param opts - YourModule options
   */
  constructor(app: Application, opts?: Partial<YourModuleOptions>);
  
  // Add method signatures here
}
```

3. **Update the main index.d.ts file** to export your new module:

```typescript
export {
  default as YourModule,
  YourModuleOptions
} from './modules/YourModule';
```

## Running Type Checking

Run `yarn types` to generate and check type definitions.