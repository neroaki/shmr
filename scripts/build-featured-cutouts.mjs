// Original RGB is copied byte-for-byte; only the alpha channel is authored.
// SHARP_MODULE may point to a local Sharp installation without adding an app dependency.
import { readFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
const { default: sharp } = await import(process.env.SHARP_MODULE || 'sharp')
const root = new URL('../src/assets/images/', import.meta.url)
const masks = JSON.parse(await readFile(new URL('./featured-cutout-masks.json', import.meta.url), 'utf8'))
await mkdir(new URL('cutouts/', root), { recursive: true })
const report = []
for (const [name, { crop, path }] of Object.entries(masks)) {
  const source = fileURLToPath(new URL(`${name}.jpg`, root))
  const { data: rgb, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${info.width}" height="${info.height}" viewBox="0 0 ${info.width} ${info.height}"><path fill="white" d="${path}"/></svg>`
  // Supersample the silhouette, never the photograph. Subpixel edge only; no broad feather.
  const { data: mask, info: maskInfo } = await sharp(Buffer.from(svg), { density: 288 })
    .resize(info.width, info.height, { kernel: 'lanczos3' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const output = Buffer.alloc(crop.width * crop.height * 4)
  for (let y = 0; y < crop.height; y++) for (let x = 0; x < crop.width; x++) {
    const sourceIndex = (y + crop.top) * info.width + x + crop.left
    const destIndex = (y * crop.width + x) * 4
    for (let channel = 0; channel < 3; channel++) output[destIndex + channel] = rgb[sourceIndex * 3 + channel]
    output[destIndex + 3] = mask[sourceIndex * maskInfo.channels + maskInfo.channels - 1]
  }
  const destination = fileURLToPath(new URL(`cutouts/${name}.png`, root))
  await sharp(output, { raw: { width: crop.width, height: crop.height, channels: 4 } }).png({ compressionLevel: 9 }).toFile(destination)
  const decoded = await sharp(destination).raw().toBuffer()
  if (!decoded.equals(output)) throw new Error(`${name}: encoded pixels changed`)
  report.push({ name, ...crop, pixelVerification: 'All cropped RGB samples identical to decoded source; alpha only changed' })
}
console.log(JSON.stringify(report, null, 2))
