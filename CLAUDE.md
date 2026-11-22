# Developing Jupiter

Use Node.js 24 and Yarn Classic 1.22.22 to match CI. Run these commands from the repository root.

| Task | Command |
| --- | --- |
| Install the locked dependencies | `yarn install --frozen-lockfile` |
| Install Chromium for Playwright | `npx playwright install chromium` (on a fresh Linux CI host, add `--with-deps`) |
| Browse the demos at `http://localhost:8448/` | `yarn vite` |
| Run the Chromium suite | `yarn test` |
| Run one spec | `yarn test e2e/moonwalk-contracts.spec.js` |
| Debug interactively or open the HTML report | `yarn playwright:ui` or `yarn playwright:report` |
| Regenerate declarations from source | `yarn types` |
| Compile a strict TypeScript consumer of the npm tarball | `yarn verify:package` |
| Rebuild the standalone ES and UMD files in `test-pages/dist/` | `yarn vite:build` |
| Measure the package and production consumer bundles | `yarn size` |

Playwright starts the Vite demo server automatically. Module-specific test shortcuts are listed in [package.json](package.json). For versioning, generated artifacts and npm publication, follow the [release guide](RELEASE.md).

## Source conventions

- Public module classes live in `src/modules/<Name>/index.js`. Add public exports to [src/index.js](src/index.js). Shared implementation helpers can stay private.
- Use two-space indentation, single quotes and no trailing semicolons. Use PascalCase for classes, camelCase for functions and variables, and uppercase names for event constants.
- Read lifecycle event names from [src/events/index.js](src/events/index.js). Keep a disposer for each application callback or listener a module owns when it supports teardown.
- For flat options, see [applyDefaults](src/utils/applyDefaults.js). Modules with nested defaults use `lodash.defaultsdeep`. Preserve existing handling of nested values and caller-supplied options when changing either path.
- Document option properties and signatures in source JSDoc. Regenerate the declarations and standalone demo builds when their inputs change. CI checks the tracked output. See the [TypeScript guide](types/README.md).
