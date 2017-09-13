const Koa = require('koa')
const KoaRouter = require('koa-router')
const Boom = require('boom')
const bodyParser = require('koa-bodyparser')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware')
const { Nuxt, Builder } = require('nuxt')
const log4js = require('log4js')

log4js.configure({
  appenders: {
    server: {
      type: 'file',
      filename: 'server.log'
    }
  },
  categories: {
    default: {
      appenders: ['server'],
      level: 'info'
    }
  }
})

const logger = log4js.getLogger()

logger.info('|')
logger.info('server start...')

const app = new Koa()
const router = new KoaRouter()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9086

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const Separator = '-'
let buildIndex = 0
let promise
// Instantiate nuxt.js
let nuxt

async function nuxtBuild() {
  logger.info('pid:', process.pid)
  logger.info('nuxt build: old nuxt is', nuxt ? typeof nuxt : nuxt)
  if (nuxt) {
    config.build.buildDir = `${nuxt.options.buildDir.split(Separator)[0]}-${++buildIndex}` // 换一个目录
  }
  const innerNuxt = new Nuxt(config) // 如果重复利用Nuxt, nuxt在build的时候是不能提供服务的, 所以每次new
  innerNuxt.buildIndex = buildIndex
  if (nuxt == null) { // 初始化的时候第一次没有，直接赋值
    nuxt = innerNuxt
  }
  const builder = new Builder(innerNuxt)
  promise = builder.build().then(() => {
    if (nuxt === innerNuxt) {
    } else {
      const temp = nuxt
      nuxt = innerNuxt
      temp.close()
    }
    promise = null // 置空
  }).catch(e => {
    logger.error(e)
    promise = null // 置空
    if (config.dev) {
      process.exit(1)
    }
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
    logger.info('/sync ----> ', ctx.request.body)
    ctx.status = 200
    const statePromise = promise || nuxtBuild()
    await statePromise.then(() => {
      ctx.response.body = {
        result: 'build ok.'
      }
    }).catch(e => {
      ctx.response.body = {
        result: e.message || 'build error.'
      }
    })
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

  await new Promise((resolve, reject) => {
    ctx.res.on('close', resolve)
    ctx.res.on('finish', resolve)
    logger.info('nuxt build index:', nuxt.buildIndex)
    nuxt.render(ctx.req, ctx.res, promise => {
      // nuxt.render passes a rejected promise into callback on error.
      promise.then(resolve).catch(reject)
    })
  })
})

app.listen(port, host)

logger.info(`Server listening on ${host}:${port}`)
