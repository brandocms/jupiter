// The package check supplies a temporary consumer with the npm tarball installed.
import { stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'
import { build } from 'vite'

const [consumer, tarball] = process.argv.slice(2)
const entry = path.join(consumer, 'entry.js')
const measurements = []

function measure(label, chunks) {
  const total = { build: label, bytes: 0, gzip: 0, brotli: 0 }
  for (const chunk of chunks) {
    const bytes = Buffer.from(chunk.code)
    total.bytes += bytes.length
    total.gzip += gzipSync(bytes, { level: 9 }).length
    total.brotli += brotliCompressSync(bytes, {
      params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
    }).length
  }
  measurements.push(total)
}

// Static imports are downloaded with the entry. Dynamic imports can load later.
function initialChunks(entry, byName, visited = new Set()) {
  if (!visited.has(entry)) {
    visited.add(entry)
    for (const name of entry.imports) initialChunks(byName.get(name), byName, visited)
  }
  return visited
}

const libraries = await build({
  logLevel: 'silent',
  build: { write: false, reportCompressedSize: false },
})
for (const format of libraries) {
  for (const chunk of format.output) {
    if (chunk.type === 'chunk') measure(chunk.fileName, [chunk])
  }
}

async function measureConsumer(label, source, requestedModule) {
  await writeFile(entry, source)
  const bundle = await build({
    root: consumer,
    configFile: false,
    logLevel: 'silent',
    build: {
      write: false,
      target: 'es2020',
      minify: 'esbuild',
      modulePreload: false,
      rollupOptions: { input: entry, preserveEntrySignatures: 'strict' },
    },
  })
  const chunks = bundle.output.filter(chunk => chunk.type === 'chunk')
  const byName = new Map(chunks.map(chunk => [chunk.fileName, chunk]))
  const initial = initialChunks(chunks.find(chunk => chunk.isEntry), byName)
  measure(label, initial)
  const deferred = chunks.filter(chunk => !initial.has(chunk))
  if (deferred.length) measure(label + ' (on demand)', deferred)
  if (requestedModule) {
    const module = chunks.find(chunk => chunk.facadeModuleId === path.join(consumer, requestedModule))
    const requested = [...initialChunks(module, byName)].filter(chunk => !initial.has(chunk))
    measure(label + ' (carousel opened)', requested)
  }
}

const imports = [
  '*', 'Application', 'Lazyload', 'Dataloader', 'Application, Lazyload', 'Looper', 'Moonwalk', 'Parallax', 'Popup', 'Popover',
  'Toggler', 'EqualHeightImages', 'FooterReveal', 'StackedBoxes', 'SmartVideo', 'imageIsLoaded',
  '_defaultsDeep', 'animate', 'Parallax, Popup, Popover, EqualHeightImages',
]
for (const names of imports) {
  const exports = names === '*' ? '*' : '{ ' + names + ' }'
  await measureConsumer(names, `export ${exports} from '@brandocms/jupiter'\n`)
}

await measureConsumer('App with eager carousel', "export { Application, Looper } from '@brandocms/jupiter'")
await writeFile(path.join(consumer, 'carousel.js'), "export { Looper as default } from '@brandocms/jupiter'")
await measureConsumer('App with lazy carousel', `
  export { Application } from '@brandocms/jupiter'
  export const loadCarousel = () => import('./carousel.js')
`, 'carousel.js')

console.log('npm tarball (bytes)', (await stat(tarball)).size)
console.table(measurements)
