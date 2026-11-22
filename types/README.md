# TypeScript with Jupiter

Import values from `@brandocms/jupiter` in a browser application. TypeScript resolves the package's `types` entry to `types/public.d.ts`, which re-exports the declarations generated from the same JavaScript entry as the runtime. The declarations use browser DOM types.

```ts
import { Application, Moonwalk } from '@brandocms/jupiter'

const app = new Application({ respectReducedMotion: true })
const options = {
  initialDelay: 100,
  rootMargin: '-5% 0%'
} satisfies NonNullable<ConstructorParameters<typeof Moonwalk>[1]>

const moonwalk = new Moonwalk(app, options)
app.initialize()

// Call when the view is removed.
function unmount() {
  moonwalk.destroy()
  app.destroy()
}
```

Use `ConstructorParameters` to obtain an option type from the public class. The package exports module classes, utilities, event constants and Motion functions from its root. The precision of individual signatures depends on their source JSDoc.

## Maintaining declarations

1. Update the public JavaScript implementation and its JSDoc in `src/`. Add new public values to `src/index.js`.
2. Run `yarn types` from the repository root. TypeScript emits `types/index.d.ts` and module declarations using `tsconfig.json`. The hand-maintained `types/public.d.ts` entry also supplies the browser compatibility declaration used by Motion.
3. Run `yarn verify:package`. It packs Jupiter, extracts the tarball into a temporary consumer and compiles with browser globals, strict checking and `skipLibCheck` disabled.
4. Include the regenerated declarations with the source change. CI regenerates them and checks for differences.
