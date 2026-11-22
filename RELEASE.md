# Release Instructions

Releases are cut from `main` and published to npm by CI when a version tag is
pushed (`.github/workflows/npmpublish.yml`). Don't run `npm publish` by hand.

  1. On `main`, bump `version` in `package.json`.
  2. Add a `#### X.X.X` entry at the top of `CHANGELOG.md`.
  3. If public APIs or options changed, run `yarn types` so `types/` is current.
  4. `yarn test`
  5. Commit with the version as the subject, e.g. `5.0.0-beta.23`.
  6. Tag that commit with the same version, without a "v":
     `git tag 5.0.0-beta.23` (NOT `v5.0.0-beta.23`).
  7. Push the branch and the tag:
     `git push origin main 5.0.0-beta.23`
  8. Watch the "Node.js Package" workflow in GitHub Actions. It runs the
     Playwright suite and then publishes.

## npm dist-tags

CI picks the dist-tag from the tag name:

  - A tag containing `alpha`, `beta`, `rc` or `next` publishes to `next`.
  - Any other tag publishes to `latest`.

CI publishes whatever version `package.json` holds, so the tag and
`package.json` must match.

## Publishing auth

Publishing uses npm trusted publishing (OIDC), so no npm token is stored in the
repo. The trusted publisher on npmjs.com is bound to this repository and the
`npmpublish.yml` workflow file. Renaming that file breaks publishing until the
npm side is updated.
