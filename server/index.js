import express, { Router } from 'express'
import bodyParser from 'body-parser'
import proxy from 'http-proxy-middleware'
import {Nuxt, Builder} from 'nuxt'
import log from './log'

const pull = require('../client/pull')

const app = express()
const router = Router()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 9086

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
// const isHashUrl = config.router && config.router.mode === 'hash'
config.dev = !(process.env.NODE_ENV === 'production')

const logger = log.getLogger(config.dev)

logger.info('Server start. Pid:', process.pid)

let promise = null
let promiseErr = null
// Init Nuxt.js
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
      logger.info('exit.')
      process.exit(1)
    }
  }).then(() => {
    promise = null // 置空
  })
  await promise
}

nuxtBuild()

if (config.dev) {
  config.devProxy && router.all(/\.do$/, proxy({
    target: config.devProxy
  }))
} else {
  router.post('/sync', async function(request, response, next) {
    const data = request.body || {}
    logger.info('/sync ----> ', data)
    if (data.authKey == null) {
      response.status(401)
      response.json({
        result: 'Unauthorized'
      })
      return
    }

    response.status(200)
    if (promise) {
      response.json({
        result: 'Is building, please wait...'
      })
      return
    }
    nuxtBuild()
    response.json({
      lastMsg: promiseErr ? promiseErr.message : null,
      result: 'Start building.'
    })
  })
}

router.all(/^((?!\.do$).)*$/, nuxt.render)

// Import API Routes
app.use(router)

// Give nuxt middleware to express
// app.use(nuxt.render)

// Listen the server
app.listen(port, host)

console.log('Server listening on ' + host + ':' + port)
