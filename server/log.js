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

function log4jsShutdown() {
  log4js.info('log4js shutdown...')
  log4js.shutdown(e => {
    if (e == null) {
      return
    }
    try {
      log4js.error(e)
    } catch (error) {
      console.log(e)
      console.log(error)
    }
  })
}

process.on('exit', log4jsShutdown)
// process.on('SIGINT', log4jsShutdown)
