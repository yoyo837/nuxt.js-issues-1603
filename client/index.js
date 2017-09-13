import http from './'
import log from '../server/log'

const logger = log.getLogger(true)

if (process.env.NODE_ENV == null) {
  logger.info('NODE_ENV configuration unset')
  process.exit(1)
}
const isProd = process.env.NODE_ENV === 'production'

const hostList = isProd ? [] : ['ssr.vipwindows.com']

hostList.forEach(async host => [
  await new Promise((resolve, reject) => {
    http.post(`http://${host}:9086/sync`, {
      username: '1',
      password: '1'
    }, () => {
      console.log(this, arguments)
    })
  })
])
