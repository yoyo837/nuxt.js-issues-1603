<template>
  <div v-doc-title="'忘记密码'" class="box">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="smsCode">
        <!-- <el-input v-model="form.smsCode" placeholder="请输入验证码"></el-input> -->
        <VerifyComp :type="2" :mobile="form.mobile" v-model="form.smsCode"></VerifyComp>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-button type="primary" @click="submitForm('form')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from 'vue'
import utils from '../../components/utils'
import VerifyComp from '../components/PictureVerify'
import { Form, FormItem, Button, Row, Col, Input } from 'element-ui'
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)

export default {
  name: 'forgot',
  components: {
    VerifyComp
  },
  data() {
    return {
      rules: {
        mobile: [{
          required: true, message: '请输入您的手机号', trigger: 'blur'
        }, {
          min: 11, max: 11, message: '请输入合法的手机号码', validator: this.checkMobile, trigger: 'blur'
        }],
        smsCode: [{
          required: true, message: '请输入验证码', trigger: 'blur'
        }, {
          min: 4, max: 4, message: '请输入完整4位验证码', trigger: 'blur'
        }]
      },
      form: {
        mobile: '',
        smsCode: ''
      }
    }
  },
  methods: {
    // 校验手机号
    checkMobile(rule, value, callback, source, options) {
      if (utils.validator.isMobile(value)) {
        callback([])
      } else {
        callback([new Error()])
      }
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/pubUser/newPwd.do', {
            mobile: this.form.mobile,
            smsCode: this.form.smsCode
          }).then(() => {
            this.$router.push('/user/changepwd')
          }).catch(() => {
            //
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
