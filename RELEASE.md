# Release Instructions

Releases are cut from `main` and published to npm by CI when a version tag is
pushed (`.github/workflows/npmpublish.yml`). Don't run `npm publish` by hand.

  1. On `main`, bump `version` in `package.json`.
  2. Move the unreleased changes into a `#### X.X.X` entry in `CHANGELOG.md` using the exact package version.
  3. Run `yarn types` to regenerate declarations from source.
  4. Run `yarn verify:package`, `yarn vite:build` and `yarn test`. Include updated declarations and both regenerated demo bundles in the release commit.
  5. Commit with the version as the subject, e.g. `5.0.0-beta.23`.
  6. Tag that commit with the exact package version, for example
     `git tag 5.0.0-beta.23`.
  7. Push the branch and the tag:
     `git push origin main 5.0.0-beta.23`
  8. Watch the "Node.js Package" workflow in GitHub Actions. It runs the
     Playwright suite and then publishes.

## npm dist-tags

CI picks the dist-tag from the tag name:

  - A SemVer prerelease publishes to `next`.
  - A stable version publishes to `latest`.

CI checks that the tag matches the package version before building.

## Publishing auth

The publish job requests an OIDC token from GitHub Actions. npm must have a trusted publisher configured for this repository and the `npmpublish.yml` workflow filename. Update that configuration if the workflow is renamed.
