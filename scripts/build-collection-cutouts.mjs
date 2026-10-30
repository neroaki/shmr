// Rebuild authored silhouettes at source resolution; photographs are never resampled.
// Stage 1: render guides for narrow-band edge refinement in refine-collection-cutouts.py.
import { readFile, mkdir, copyFile, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
const { default: sharp } = await import(process.env.SHARP_MODULE || 'sharp')
const root = new URL('../src/assets/images/collection/', import.meta.url)
const backup = new URL('../asset-backups/collection-originals/', import.meta.url)
const guides = new URL('./collection-masks/', import.meta.url)
const masks = JSON.parse(await readFile(new URL('./collection-cutout-masks.json', import.meta.url), 'utf8'))
await mkdir(backup, { recursive: true })
await mkdir(guides, { recursive: true })
const report = []
for (const [name, { viewBox, path, extra }] of Object.entries(masks)) {
  const source = new URL(`${name}.webp`, root)
  const original = await readFile(source)
  const sha256 = createHash('sha256').update(original).digest('hex')
  const saved = new URL(`${name}.webp`, backup)
  try { await copyFile(source, saved, 1) } catch (error) { if (error.code !== 'EEXIST') throw error }
  if (createHash('sha256').update(await readFile(saved)).digest('hex') !== sha256) throw new Error(`Backup differs: ${name}`)
  const { width, height } = await sharp(original).metadata()
  const svg = body => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${viewBox.join(' ')}">${body}</svg>`)
  for (const [kind, body] of [['guide', `<path fill="white" fill-rule="evenodd" d="${path}"/>`], ['detail', extra || '']]) {
    await sharp(svg(body), { density: 144 }).resize(width, height).extractChannel('alpha').png().toFile(new URL(`${name}-${kind}.png`, guides).pathname)
  }
  report.push({ name, width, height, sha256, source: `src/assets/images/collection/${name}.webp`, backup: `asset-backups/collection-originals/${name}.webp` })
}
await writeFile(new URL('manifest.json', backup), JSON.stringify(report, null, 2) + '\n')
console.log(`Verified ${report.length} byte-identical backups; authored guides rendered`)
