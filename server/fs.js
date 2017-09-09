import fs from 'fs'
import fsextra from 'fs-extra'

export default {
  /**
   * 创建目录，如果不存在
   * @param {string} dir
   */
  async mkdir(dir) {
    if (dir == null) {
      return
    }
    await fsextra.pathExists(dir).then(async exists => {
      if (exists) {
      } else {
        console.log('mkdir', dir)
        await fsextra.ensureDir(dir)
      }
    })
  },
  /**
   * 复制文件
   * @param {string} src
   * @param {string} dest
   */
  async copy(src, dest) {
    if (src == null || dest == null) {
      return
    }
    console.log(`copy from ${src} to ${dest}`)
    await fsextra.copy(src, dest)
  },
  /**
   * 清空目录/删除目录下所有
   * @param {string} dir
   */
  async emptyDir(dir) {
    if (dir == null) {
      return
    }
    await this.removeFileFromDir(dir)
  },
  /**
   * 删除目录下部分文件/目录
   * @param {string} dir
   * @param {function} fn
   */
  async removeFileFromDir(dir, fn) {
    if (dir == null) {
      return
    }
    fn = typeof fn === 'function' ? fn : file => {
      return true
    }
    await this.mkdir(dir).then(new Promise((resolve, reject) => {
      try {
        fs.readdirSync(dir).forEach(async file => {
          if (fn(file)) {
            await this.removeFile(`${dir}/${file}`)
          }
        })
        resolve()
      } catch (e) {
        reject(e)
      }
    }))
  },
  /**
   * 删除文件/目录
   * @param {string} file
   */
  async removeFile(file) {
    if (file) {
      console.log('del', file)
      await fsextra.remove(file)
    }
  }
}
