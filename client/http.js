const _ = require('lodash')
const request = require('request')

const GET = 'get'
const POST = 'post'

function core(method, url, params, fn) {
  method = method || GET
  if (typeof params === 'function') {
    fn = params
    params = {}
  }
  const option = {
    url,
    json: true
  }
  if (method === GET) {
    _.assign(option, {qs: params})
  } else if (method === POST) {
    _.assign(option, {body: params})
  }
  request[method](option, function (e) {
    if (e) {
      throw e
    }
    if (typeof fn === 'function') {
      fn.apply(this, arguments)
    }
  })
}

module.exports = {
  get(url, params, fn) {
    return core(null, url, params, fn)
  },
  post(url, params, fn) {
    return core(POST, url, params, fn)
  }
}
