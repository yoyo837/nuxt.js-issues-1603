const shell = require('shelljs')
const pull = require('./pull')

if (!shell.which('git')) {
  // shell.echo('Sorry, this script requires git, please install the git client
  // first.')
  throw new Error('Sorry, this script requires git, please install the git client first.')
}
pull.pullPages().then(() => {
  const stdout = shell.exec('git status', {
    // silent: true
  }).stdout
  if (stdout.indexOf('up-to-date') > 0 && stdout.indexOf('nothing to commit, working tree clean') > 0) {
    process.exit()
  }
  throw new Error('Please submit all changes, pull the remote code to the local, merge the conflicting code, and then submit again and push it to the remote.')
}).catch(e => {
  console.log(e)
  process.exit(1)
})
