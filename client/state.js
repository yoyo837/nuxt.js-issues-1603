const shell = require('shelljs')

if (!shell.which('git')) {
  // shell.echo('Sorry, this script requires git, please install the git client
  // first.')
  throw new Error('Sorry, this script requires git, please install the git client first.')
}
if (!/\bup-to-date\bnothing to commit, working tree clean\b/.test(shell.exec('git status').stdout)) {
  throw new Error('请提交所有更改，拉取远程最新代码合并后同步到服务器.')
}
