import fs from 'fs'
import fsextra from 'fs-extra'
// import rimraf from 'rimraf'
import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import layouts from '../layouts'

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9086

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const pagePath = 'pages'
fs.readdirSync(pagePath).forEach(file => {
  if (file.toLowerCase() === '.gitkeep') {
    return
  }
  fsextra.removeSync(`${pagePath}/${file}`)
})

fsextra.copySync(`${pagePath}.${layouts.skinName}`, pagePath)
// rimraf(path.join(__dirname, '../pages/*'), err => {
//   console.log(err)
// })

// Instantiate nuxt.js
const nuxt = new Nuxt(config)

// Build in development
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build().catch(e => {
    console.error(e) // eslint-disable-line no-console
    process.exit(1)
  })
}

app.use(ctx => {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset

  return new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})

app.listen(port, host)
// eslint-disable-line no-console
console.log(`Server listening on ${host}:${port}`)
