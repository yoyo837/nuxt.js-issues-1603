import Koa from 'koa'
import KoaRouter from 'koa-router'
import Boom from 'boom'
import bodyParser from 'koa-bodyparser'
import c2k from 'koa2-connect'
import proxy from 'http-proxy-middleware'
import { Nuxt, Builder } from 'nuxt'
import log4js from 'log4js'
import pull from './pull'
import log from './log'
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
const app = new Koa()

config.dev = !(app.env === 'production')

const logger = log.getLogger(config.dev)
// const logger = log.getLogger(true)

logger.info('|')
logger.info('server start...')
logger.info('pid:', process.pid)

const router = new KoaRouter()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9086

let promise = null
let promiseErr = null
// Instantiate nuxt.js
const nuxt = new Nuxt(config)

async function nuxtBuild() {
  if (!config.dev) {
    await pull.pullPages()
  }
  const builder = new Builder(nuxt)
  promise = builder.build().then(() => {
    promiseErr = null
  }).catch(e => {
    promiseErr = e
    logger.error(e)
    if (config.dev) {
      process.exit(1)
    }
  }).then(() => {
    promise = null // 置空
  })
  await promise
}

nuxtBuild()
// Build in development
if (config.dev) {
  const doAPIReg = /\.do$/
  const cp = c2k(proxy({
    target: 'http://localhost:8082/portal/'
  }))

  router.get(doAPIReg, cp)

  router.post(doAPIReg, cp)
} else {
  router.post('/sync', async function(ctx, next) {
    const data = ctx.request.body || {}
    logger.info('/sync ----> ', data)
    if (data.authKey == null) {
      ctx.status = 401
      ctx.response.body = {
        result: 'Unauthorized'
      }
      return
    }

    ctx.status = 200
    if (promise) {
      ctx.response.body = {
        result: 'Is building, please wait...'
      }
      return
    }
    ctx.response.body = {
      result: 'test..'
    }
    // nuxtBuild()
    // ctx.response.body = {
    //   lastMsg: promiseErr ? promiseErr.message : null,
    //   result: 'Start building.'
    // }
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

router.get(/(^\/_nuxt(?:\/|$))|(^\/(?:__webpack_hmr|$)$)/, async function(ctx, next) {
  ctx.status = 200 // koa defaults to 404 when it sees that status is unset

  if (ctx.request.url === '/' || ctx.request.url.startsWith('/?')) {
    logger.info('get:', ctx.request.url)
  }

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

logger.info(`Server listening on ${host}:${port}`)

function log4jsShutdown() {
  log4js.info('log4js shutdown...')
  log4js.shutdown(e => {
    if (e == null) {
      return
    }
    try {
      log4js.error(e)
    } catch (error) {
      console.log(e)
      console.log(error)
    }
  })
}

process.on('exit', log4jsShutdown)
// process.on('SIGINT', log4jsShutdown)
