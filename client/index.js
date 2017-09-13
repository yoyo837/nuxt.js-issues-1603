// backpack 暂不支持多个entry，不然可以一起抽取为ES6 import
const _ = require('lodash')
const http = require('./http')

if (process.env.NODE_ENV == null) {
  console.info('NODE_ENV configuration unset')
  process.exit(1)
}
const isProd = process.env.NODE_ENV === 'production'

const hostList = isProd
  ? [] // 正式
  : ['ssr.vipwindows.com'] // 测试

const promiseList = []

_.uniq(hostList).forEach(host => {
  promiseList.push(new Promise((resolve, reject) => {
    console.log('Start sync:', host, 'Please wait, it may take a few seconds...')
    try {
      http.post(`http://${host}/sync`, {
        authKey: '123' // 预留
      }, (e, httpResponse, body) => {
        if (e || [200, 206, 304].indexOf(httpResponse.statusCode) < 0) {
          reject(e || new Error(`http ${httpResponse.statusCode} => ${httpResponse.statusMessage}`))
          return
        }
        resolve()
      })
    } catch (e) {
      reject(e)
    }
  }))
})

Promise.all(promiseList).then(() => {
  console.log('Sync Done.')
}).catch(e => {
  console.log(e)
})
