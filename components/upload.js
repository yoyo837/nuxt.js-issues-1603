import ajax from './ajax'
import popup from './popup'

const domId = 'singleUploader'
const holdKey = 'uploading'

export default {
  // singleUpload() {
  avatarUpload(pubAccountId, relType) { // 先针对用户头像封装
    return new Promise((resolve, reject) => {
      if (process.browser) {
        let input = document.getElementById(domId)
        if (input == null) {
          input = document.createElement('input')
          input.className = 'single-upload-file hidden'
          input.setAttribute('id', domId)
          // input.setAttribute('multiple', 'multiple') // 支持多选
          input.setAttribute('type', 'file')
          input.onchange = function () {
            if (this.value) {
              input.setAttribute(holdKey, true)
              ajax.post('/commonFile/filesSave.do', {
                objectId: pubAccountId,
                relType,
                file: input
              }, {multiForm: true}).then(data => {
                input.removeAttribute(holdKey)
                resolve({})
              }).catch(e => {
                input.removeAttribute(holdKey)
                reject(e)
              })
            }
          }
          document.body.appendChild(input)
        }
        if (input.getAttribute(holdKey)) {
          const msg = '正在处理上传任务，请稍后再试'
          popup.alert(msg)
          reject(new Error(msg))
          return
        }
        input.click()
      }
    })
  }
}
