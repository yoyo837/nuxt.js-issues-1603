import request from 'request'

function core(method, url, params, fn) {
  method = method || 'get'
  if (typeof params === 'function') {
    fn = params
    params = {}
  }
  request[method]({
    url,
    qs: method === 'get'
      ? params
      : null,
    body: method === 'post'
      ? params
      : null,
    json: true
  }, function(e) {
    if (e) {
      console.log(e)
    }
    if (typeof fn === 'function') {
      fn.apply(this, arguments)
    }
  })
}

export default {
  get(url, params, fn) {
    return core(null, url, params, fn)
  },
  post(url, params, fn) {
    return core('post', url, params, fn)
  }
}
