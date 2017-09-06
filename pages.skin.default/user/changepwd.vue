<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" v-doc-title="'设置新密码'" class="box">
    <el-form-item label="新密码" prop="newPwd1">
      <el-input v-model="form.newPwd1" placeholder="请输入新密码" type="password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="newPwd2">
      <el-input v-model="form.newPwd2" placeholder="请确认新密码" type="password"></el-input>
    </el-form-item>
    <el-form-item label-width="0px">
      <el-button type="primary" @click="submitForm('form')">确认修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from 'vue'
import { Form, FormItem, Button, Row, Col, Input } from 'element-ui'
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Input.name, Input)
export default {
  name: 'changepwd',
  data() {
    return {
      rules: {
        newPwd1: [{
          required: true, message: '请输入您的新密码', trigger: 'blur'
        }],
        newPwd2: [{
          required: true, message: '请确认您的新密码', trigger: 'blur'
        }, {
          min: 1, message: '两次输入密码不一致', validator: this.checkNewPwd, trigger: 'blur'
        }]
      },
      form: {
        newPwd1: '',
        newPwd2: ''
      }
    }
  },
  methods: {
    checkNewPwd(rule, value, callback, source, options) {
      if (this.form.newPwd1 === this.form.newPwd2) {
        callback([])
      } else {
        callback([new Error('13')])
      }
    },  // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/pubUser/updatePwd.do', {
            pwd: this.form.newPwd1,
            pwds: this.form.newPwd2
          }).then(() => {
            this.$router.replace('/user/my')
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
