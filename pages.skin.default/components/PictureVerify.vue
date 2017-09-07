<template>
  <div>
    <el-input v-model="smsCode" placeholder="请输入验证码" @change="onChange"></el-input>
    <el-button type="primary" @click="getSmsCode" :disabled="smsBtnDisabled" class="btn-right">{{smsBtnText}}</el-button>

    <el-dialog title="短信验证码发送" :visible.sync="dVisible" class="portal-dialog" :class="{'portal-dialog-mobile': isMbl}">
      <el-form ref="codeForm" :model="codeForm" :rules="rules">
        <el-form-item prop="code">
          <el-input placeholder="请输入图像验证码" v-model="codeForm.code" :maxlength="4">
            <template slot="append">
              <img :src="codeSrc" @click="refreshT" alt="验证码加载中">
            </template>
          </el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm('codeForm')">发送</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import popup from '../../components/popup'
import utils from '../../components/utils'
import store from '../../components/store'
import { Form, FormItem, Button, Row, Col, Dialog } from 'element-ui'
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)

const storeKey = 'picture-verify-timeout'
const timeout = 60

export default {
  name: 'pictureVerify',
  props: {
    mobile: {
      type: String,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  mounted() {
    this.currTimeout = store.session.get(storeKey) || timeout
    if (this.currTimeout > 0 && this.currTimeout < timeout) {
      this.disBtn()
    }
  },
  methods: {
    onChange() {
      this.$emit('input', this.smsCode)
    },
    // 刷新图片验证码
    refreshT() {
      this.t = Date.now()
    },
    // 获取验证码
    getSmsCode() {
      if (utils.validator.isMobile(this.mobile)) {
        this.dVisible = true
        this.refreshT()
        return
      }
      popup.alert('请输入合法的手机号码')
    },
    startTimer() {
      if (this.smsBtnDisabled) {
        return
      }

      const fn = () => {
        if (this.currTimeout <= 0) {
          this.enableBtn()
          return
        }
        this.currTimeout--
        this.smsBtnText = `${this.currTimeout}秒后重发`
        store.session.put(storeKey, this.currTimeout)
        setTimeout(fn, 1000 * 1)
      }
      fn()
    },
    // 禁用按钮并开始倒计时，时间到后重新启用按钮
    disBtn() {
      this.startTimer()
      this.smsBtnDisabled = true // 锁定
    },
    // 恢复
    enableBtn() {
      this.smsBtnDisabled = false // 解锁
      this.smsBtnText = '发送验证码'
    },
    // 发送短信
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.post('/commonSms/send.do', {
            mobile: this.mobile,
            codeType: this.type, // 1注册，2是找回，3修改手机号
            codeValid: this.codeForm.code
          }).then(() => {
            popup.alert('发送成功，请注意查收')
            this.disBtn()
            this.dVisible = false
          }).catch(() => {
            this.refreshT()
          })
        }
        return false
      })
    }
  },
  computed: {
    codeSrc() {
      return this.$http.getAbstractUrl(`/commonSms/getCode.do?mobile=${this.mobile}&t=${this.t}`)
    }
  },
  data() {
    return {
      rules: {
        code: [{
          required: true, message: '请输入右侧的图形验证码', trigger: 'blur'
        }, {
          min: 4, max: 4, message: '请输入完整的图形验证码', trigger: 'blur'
        }]
      },
      isMbl: utils.isMobile(),
      t: Date.now(),
      codeForm: {
        code: ''
      },
      smsCode: '',
      dVisible: false,
      smsBtnDisabled: false,
      smsBtnText: '发送验证码',
      currTimeout: 0
    }
  }
}
</script>

<style lang="scss">

</style>
