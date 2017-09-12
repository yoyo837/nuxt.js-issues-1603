const Koa = require('koa')
const KoaRouter = require('koa-router')
const Boom = require('boom')
const bodyParser = require('koa-bodyparser')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
const router = new KoaRouter()
const host = process.env.HOST || '*'
const port = process.env.PORT || 9086

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

// Instantiate nuxt.js
const nuxt = new Nuxt(config)

// Build in development
if (config.dev) {
  const doAPIReg = /\.do$/
  const cp = c2k(proxy({
    target: 'http://localhost:8082/portal/'
  }))

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
  console.log('/sync ---> ', ctx.request.body)
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

console.log(`Server listening on ${host}:${port}`)
