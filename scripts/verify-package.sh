#!/usr/bin/env bash
set -euo pipefail

scratch=$(mktemp -d)
trap 'rm -rf "$scratch"' EXIT
name=$(npm pack --silent --pack-destination "$scratch")
mkdir -p "$scratch/node_modules/@brandocms/jupiter"
tar -xzf "$scratch/$name" --strip-components=1 -C "$scratch/node_modules/@brandocms/jupiter"
for dep in motion motion-dom lodash.defaultsdeep; do
  ln -s "$PWD/node_modules/$dep" "$scratch/node_modules/$dep"
done

if [[ "${1:-}" == "--size" ]]; then
  node scripts/bundle-size.mjs "$scratch" "$scratch/$name"
  exit
fi

cat > "$scratch/consumer.ts" <<'TS'
import { Application, animate, imageIsLoaded, _defaultsDeep } from '@brandocms/jupiter'
const app = new Application()
app.initialize()
animate(document.body, { opacity: 1 })
imageIsLoaded(new Image())
const config: { enabled: boolean } = _defaultsDeep({}, { enabled: true })
TS
# Use only browser globals so repository development types cannot mask missing declarations.
cat > "$scratch/tsconfig.json" <<'JSON'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": [],
    "strict": true,
    "skipLibCheck": false,
    "noEmit": true
  },
  "files": ["consumer.ts"]
}
JSON
node_modules/.bin/tsc --project "$scratch/tsconfig.json"
