<template>
  <div v-doc-title="'登陆'" class="box">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="form.pwd" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button type="primary" @click="submitForm('form')">马上登陆</el-button>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button @click="toRegister">注册一个新账号</el-button>
      </el-form-item>
    </el-form>
    <div class="text-right">
      <nuxt-link to="/user/forgot">找回密码</nuxt-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import util from '../../components/utils'
// 引入全部
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
import { Form, FormItem, Button, Row, Col, Input } from 'element-ui'
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)

export default {
  name: 'login',
  data() {
    return {
      rules: {
        mobile: [{
          required: true, message: '请输入您的手机号', trigger: 'blur'
        }, {
          min: 11, max: 11, message: '请输入合法的手机号码', validator: this.checkMobile, trigger: 'blur'
        }],
        pwd: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }]
      },
      form: {
        mobile: '',
        pwd: ''
      }
    }
  },
  methods: {
    toRegister() {
      this.$router.push('/user/register')
    },
    checkMobile(rule, value, callback, source, options) {
      if (util.validator.isMobile(value)) {
        callback([])
      } else {
        callback([new Error()])
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/pubUser/login.do', this.form).then(() => {
            // 登陆成功
            // redirectURL
            let redirectURL = decodeURIComponent(this.$route.query['redirectURL'] || '')
            const prefix = `${location.protocol}//${location.host}/#`
            if (redirectURL.startsWith(prefix)) {
              redirectURL = redirectURL.substr(prefix.length)
            }
            this.$router.replace(redirectURL || '/user/my')
          }).catch(() => {
          })
        }
        return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  width: 100%; // 如果有attribute能控制则最好不使用css
}
</style>
