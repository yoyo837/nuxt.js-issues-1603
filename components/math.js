/**
 * 可能使用到的数学运算相关逻辑，非直接使用运算符或者Math对象能够解决的
 */
Math.formatFloat = function(f, digit) {
  const m = Math.pow(10, digit)
  return parseInt(f * m, 10) / m
}

/**
* 转换number
* @param {string|number} num
*/
function numberValid(num) {
  const temp = +num
  /* eslint-disable eqeqeq */
  if (temp == num) {
    return num
  }
  if (isNaN(temp)) {
    return 0
  }
  return temp
}

/**
* 加
* @param {Number} arg1
* @param {Number} arg2
*/
function add(arg1, arg2) {
  arg1 = numberValid(arg1)
  arg2 = numberValid(arg2)
  const r1 = (arg1.toString().split('.')[1] || '').length
  const r2 = (arg2.toString().split('.')[1] || '').length
  const m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

/**
* 减
* @param {Number} arg1
* @param {Number} arg2
*/
function sub(arg1, arg2) {
  arg1 = numberValid(arg1)
  arg2 = numberValid(arg2)
  const r1 = (arg1.toString().split('.')[1] || '').length
  const r2 = (arg2.toString().split('.')[1] || '').length
  // return Math.formatFloat(arg1 - arg2, Math.max(r1, r2))
  const m = Math.pow(10, Math.max(r1, r2))
  // //动态控制精度长度
  const n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}

/**
* 乘
* @param {Number} arg1
* @param {Number} arg2
*/
function mul(arg1, arg2) {
  arg1 = numberValid(arg1)
  arg2 = numberValid(arg2)
  const r1 = (arg1.toString().split('.')[1] || '').length
  const r2 = (arg2.toString().split('.')[1] || '').length
  // return Math.formatFloat(arg1 * arg2, r1 + r2)
  return Number(arg1.toString().replace('.', '')) * Number(arg2.toString().replace('.', '')) / Math.pow(10, r1 + r2)
}

/**
* 除
* @param {Number} arg1
* @param {Number} arg2
*/
function div(arg1, arg2) {
  arg1 = numberValid(arg1)
  arg2 = numberValid(arg2)
  const t1 = (arg1.toString().split('.')[1] || '').length
  const t2 = (arg2.toString().split('.')[1] || '').length

  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  // return Math.formatFloat(arg1 / arg2, 1)
  return (r1 / r2) * Math.pow(10, t2 - t1)
}

export default {
  add,
  sub,
  mul,
  div
}
