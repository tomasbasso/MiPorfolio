// Inserta el HTML renderizado de la app dentro de dist/index.html (prerender estático para SEO)
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const raiz = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${raiz}dist/index.html`
const serverEntry = pathToFileURL(`${raiz}dist-ssr/entry-server.js`).href

const { render } = await import(serverEntry)
const html = await readFile(indexPath, 'utf8')

const marcador = '<div id="root"></div>'
if (!html.includes(marcador)) throw new Error(`No se encontró ${marcador} en dist/index.html`)

await writeFile(indexPath, html.replace(marcador, `<div id="root">${render()}</div>`))
await rm(`${raiz}dist-ssr`, { recursive: true, force: true })

console.log('✓ Prerender listo: dist/index.html')
