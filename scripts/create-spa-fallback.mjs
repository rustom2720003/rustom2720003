import { copyFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

const distDirectory = join(process.cwd(), 'dist')
const indexPath = join(distDirectory, 'index.html')
const fallbackPath = join(distDirectory, '404.html')

try {
  await stat(indexPath)
  await copyFile(indexPath, fallbackPath)
  console.log('Created GitHub Pages SPA fallback: dist/404.html')
} catch (error) {
  console.error('Unable to create GitHub Pages SPA fallback.')
  console.error(error)
  process.exitCode = 1
}
