// Avisa a Bing (y demás buscadores de IndexNow) que las URLs del sitemap cambiaron. Corre después de `npm run deploy`.
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const HOST = 'tomasbasso.com.ar'
const KEY = 'e47bc91eaee7ad024c00442f7116a7bc'
const keyLocation = `https://${HOST}/${KEY}.txt`

const raiz = fileURLToPath(new URL('..', import.meta.url))
const sitemap = await readFile(`${raiz}public/sitemap.xml`, 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1])
  .filter((u) => u.startsWith(`https://${HOST}/`) && !/\.(png|webp|jpe?g|svg)$/.test(u))

// GitHub Pages tarda un poco en publicar: se espera a que la clave esté online (hasta ~3 min)
let online = false
for (let i = 0; i < 18 && !online; i++) {
  const r = await fetch(`${keyLocation}?t=${Date.now()}`).catch(() => null)
  online = r?.ok === true && (await r.text()).trim() === KEY
  if (!online) await new Promise((res) => setTimeout(res, 10_000))
}
if (!online) {
  console.warn(`IndexNow: ${keyLocation} todavía no responde; no se envió el aviso. Reintentá con: npm run indexnow`)
  process.exit(0)
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList }),
})
console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URL)`)
if (res.status >= 400) process.exitCode = 1
