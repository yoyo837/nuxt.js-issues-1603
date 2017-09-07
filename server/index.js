import fs from 'fs'
import fsextra from 'fs-extra'
// import rimraf from 'rimraf'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import Boom from 'boom'
import bodyParser from 'koa-bodyparser'
import c2k from 'koa2-connect'
import proxy from 'http-proxy-middleware'
import { Nuxt, Builder } from 'nuxt'

const app = new Koa()
const router = new KoaRouter()
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

// Instantiate nuxt.js
const nuxt = new Nuxt(config)

fsextra.copySync(config.skin.getPagesPath.apply(nuxt), pagePath)
// rimraf(path.join(__dirname, '../pages/*'), err => {
//   console.log(err)
// })

// Build in development
const doAPIReg = /\.do$/
const cp = c2k(proxy({
  target: 'http://localhost:8082/portal/'
}))

if (config.dev) {
  router.get(doAPIReg, cp)

  router.post(doAPIReg, cp)

  const builder = new Builder(nuxt)
  builder.build().catch(e => {
    /* eslint-disable no-console */
    console.error(e)
    process.exit(1)
  })
}

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  /* eslint-disable new-cap */
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))

router.post('/sync', function(ctx, next) {
  console.log('收到同步请求 ---> ', ctx.request.body)
  ctx.status = 200
  ctx.response.body = {
    result: 123
  }
})

router.get(/(^\/_nuxt(?:\/|$))|(^\/(?:__webpack_hmr|$)$)/, async function(ctx, next) {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset

  await new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})

app.listen(port, host)
/* eslint-disable no-console */
console.log(`Server listening on ${host}:${port}`)
