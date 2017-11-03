<template>
  <div>
    <transition name="fade-down">
      <div class="login-back" v-show="showLogin">
        <div class="login-cover"></div>  
        <img src="../assets/frame/jizhuangxiang.jpg" alt="">
      </div>
    </transition>
    <transition name="fade-up">
      <div class="card card-shadow login-block" v-show="showLogin">
        <div class="login-title">
          <p>舱单审核 - 登陆</p>
        </div>
        <div class="login-main">
          <ep-form ref="form" :form="form" :rules="rules"  name-width="80px" name-position="top">
            <ep-form-item label="用户名" attr="id">
              <ep-input v-focus v-model="form.id"  :minlength="6" :maxlength="20"></ep-input>
            </ep-form-item>
            <ep-form-item label="密码" attr="password">
              <ep-input v-model="form.password" type="password" :minlength="6" :maxlength="20"></ep-input>
            </ep-form-item>
          </ep-form>
          <div style="padding-top: 6px; text-align: right">
            <ep-button type="primary" @click="handleLogin">登陆</ep-button>
          </div>
        </div>
        <div class="login-copyright">
          <hr>
          <p>Copyright (C) 2001-2017 easipass.com. All Rights Reserved</p>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { login } from 'utils'
export default {

  name: "Login",

  mounted () { this.showLogin = true },

  data () {
    return {
      showLogin: false,
      form: {
        id: '',
        password: ''
      },
      rules: {
        id: { min: 6, max: 20, required: true, message: '用户名必须为6-20个字符', trigger: 'blur' },
        password: { min: 6, max: 20, required: true, message: '密码必须为6-20个字符', trigger: 'blur' }
      }
    }
  },

  methods: {
    handleLogin () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          login(this.form)
        }
      });
    }
  }

}
</script>
