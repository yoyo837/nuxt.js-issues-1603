import log4js from 'log4js'

log4js.configure({
  appenders: {
    server: {
      type: 'file',
      filename: 'server.log',
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
