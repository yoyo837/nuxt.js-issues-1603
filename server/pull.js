import shell from 'shelljs'

export default {
  async pullPages() {
    await new Promise((resolve, reject) => {
      shell.cd('server')
      if (!shell.which('git')) {
        // shell.echo('Sorry, this script requires git, please install the git client first.')
        reject(new Error('Sorry, this script requires git, please install the git client first.'))
        return
      }
      shell.cd('../pages')
      shell.exec('git pull')

      shell.cd('../')

      resolve()
    })
  }
}
