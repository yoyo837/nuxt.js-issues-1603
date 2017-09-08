import path from 'path'
import Koa from 'koa'
import KoaRouter from 'koa-router'
import Boom from 'boom'
import bodyParser from 'koa-bodyparser'
import c2k from 'koa2-connect'
import proxy from 'http-proxy-middleware'
import { Nuxt, Builder } from 'nuxt'
import svfs from './fs'

const app = new Koa()
const router = new KoaRouter()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9086

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

// config.build.buildDir 不配置默认.nuxt
// fsextra.removeSync(/^\.nuxt/) // fsextra.removeSync 不支持正则
svfs.removeFileFromDir('.', file => {
  return file.toLowerCase().startsWith('.nuxt')
})

// 是否正在构建
const Separator = '-'
// let isBuilding = false
let buildIndex = 0
let nuxt
// Instantiate nuxt.js
function nuxtBuild() {
  // isBuilding = true
  if (nuxt) {
    config.build.buildDir = `${nuxt.options.buildDir.split(Separator)[0]}-${++buildIndex}` // 换一个目录
  }
  const innerNuxt = new Nuxt(config) // 如果重复利用Nuxt, nuxt在build的时候是不能提供服务的, 所以每次new
  if (nuxt == null) { // 初始化的时候第一次没有，直接赋值
    nuxt = innerNuxt
  }

  const pagePath = path.join(innerNuxt.options.rootDir, '../pages') // nuxt的pages页面目录
  svfs.emptyDir(pagePath) // 清空
  svfs.copy(config.skin.getPagesPath.apply(innerNuxt), pagePath) // 复制新的
  // svfs.copy('pagestest', 'pages') // 复制新的

  const builder = new Builder(innerNuxt)
  builder.build().then(() => {
    if (nuxt === innerNuxt) {
    } else {
      const temp = nuxt
      nuxt = innerNuxt
      temp.close()
    }
    // isBuilding = false
    console.log('Build completed!')
  }).catch(e => {
    console.error(e)
    process.exit(1)
  })
}

// Build in development
const doAPIReg = /\.do$/
const cp = c2k(proxy({
  target: 'http://localhost:8082/portal/'
}))

if (config.dev) {
  router.get(doAPIReg, cp)

  router.post(doAPIReg, cp)

  nuxtBuild()
}

app.use(bodyParser())

app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  /* eslint-disable new-cap */
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))

router.post('/sync', (ctx, next) => {
  console.log('收到同步请求 ---> ', ctx.request.body)
  ctx.status = 200
  ctx.response.body = {
    result: 123
  }

  nuxtBuild.apply(this)
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
