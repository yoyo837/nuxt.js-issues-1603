import fs from 'fs'
import fsextra from 'fs-extra'

export default {
  /**
   * 创建目录，如果不存在
   * @param {string} dir
   */
  mkdir(dir) {
    if (dir == null) {
      return
    }
    fsextra.ensureDirSync(dir)
  },
  /**
   * 复制文件
   * @param {string} src
   * @param {string} dest
   */
  copy(src, dest) {
    if (src == null || dest == null) {
      return
    }
    console.log(`copy from ${src} to ${dest}`)
    fsextra.copySync(src, dest)
  },
  /**
   * 清空目录/删除目录下所有
   * @param {string} dir
   */
  emptyDir(dir) {
    if (dir == null) {
      return
    }
    this.removeFileFromDir(dir, file => {
      return file.toLowerCase() !== '.gitkeep'
    })
  },
  /**
   * 删除目录下部分文件/目录
   * @param {string} dir
   * @param {function} fn
   */
  removeFileFromDir(dir, fn) {
    if (dir == null) {
      return
    }
    fn = typeof fn === 'function' ? fn : file => {
      return true
    }
    fs.readdirSync(dir).forEach(file => {
      if (fn(file)) {
        this.removeFile(`${dir}/${file}`)
      }
    })
  },
  /**
   * 删除文件/目录
   * @param {string} file
   */
  removeFile(file) {
    if (file) {
      console.log('del', file)
      fsextra.removeSync(file)
    }
  }
}
