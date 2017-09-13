import log4js from 'log4js'
import path from 'path'

log4js.configure({
  appenders: {
    server: {
      type: 'file',
      filename: path.resolve('server.log'),
      maxLogSize: 10485760
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

export default {
  getLogger(isConsole) {
    return isConsole
      ? console
      : logger
  }
}
