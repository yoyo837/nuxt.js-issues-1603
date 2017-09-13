const shell = require('shelljs')

if (!shell.which('git')) {
  // shell.echo('Sorry, this script requires git, please install the git client
  // first.')
  throw new Error('Sorry, this script requires git, please install the git client first.')
}
const stdout = shell.exec('git status').stdout
if (stdout.indexOf('up-to-date') && stdout.indexOf('nothing to commit, working tree clean')) {
  throw new Error('请提交所有更改，拉取远程最新代码合并后同步到服务器.')
}
