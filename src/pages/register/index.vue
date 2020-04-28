<template>
<div class="page">
  <common-header title="注册" :back="`/login?url=${encodeURIComponent(loginRedirect)}`"></common-header>
  <div class="content" ref="content">
    <div class="login-container">
      <div class="login-content">
        <div class="login-input border-bottom">
          <span>账号</span>
          <input type="text" v-model.trim="username" placeholder="请输入账号">
        </div>
        <div class="login-input">
          <span>密码</span>
          <input type="password" v-model.trim="password" placeholder="请输入登录密码">
        </div>
        <div class="login-input">
          <span>确认密码</span>
          <input type="password" v-model.trim="confirmPwd" placeholder="请输入确认密码">
        </div>
        <div class="login-input">
          <span>昵称</span>
          <input type="text" v-model.trim="nickname" placeholder="请输入昵称">
        </div>
      </div>
      <div class="login-btn">
        <div class="submit" @click="register">提交</div>
      </div>
      <div class="login-desc">
        <router-link :to="`/login?url=${encodeURIComponent(loginRedirect)}`">去登录</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
export default {
  components: {
    CommonHeader
  },
  data () {
    return {
      backUrl: '',
      username: '',
      password: '',
      confirmPwd: '',
      nickname: '',
      loginRedirect: '',
      formDataValidator: {
        username (val) {
          if (val === '') {
            return {error: 1, message: '账号为空'}
          }
          if (val.length < 3) {
            return {error: 1, message: '账号长度小于3'}
          }
          return {error: 0}
        },
        password (val) {
          if (val === '') {
            return {error: 1, message: '密码为空'}
          }
          if (val.length < 6) {
            return {error: 1, message: '密码长度小于6'}
          }
          return {error: 0}
        },
        confirmPwd (val, password) {
          if (val === '') {
            return {error: 1, message: '确认密码为空'}
          }
          if (val !== password) {
            return {error: 1, message: '两次密码不一致'}
          }
          return {error: 0}
        },
        nickname (val) {
          if (val === '') {
            return {error: 1, message: '昵称为空'}
          }
          if (val.length < 2) {
            return {error: 1, message: '昵称长度小于2'}
          }
          return {error: 0}
        },
      }
    }
  },
  mounted () {
    let bodyHeight = document.documentElement.offsetHeight
    this.$refs.content.style.height = bodyHeight + 'px'
    this.loginRedirect = decodeURIComponent(this.$route.query.url) || '/'
  },
  methods: {
    register () {
      const data = {
        username: this.username,
        password: this.password,
        confirmPwd: this.confirmPwd,
        nickname: this.nickname
      }
      const validate = this.validate(data)
      if (!validate) {
        return
      }
      this.axios.post('shose/user/register', data).then(() => {
        this.$router.push(`/login?url=${encodeURIComponent(this.loginRedirect)}`)
      }).catch (err => {
        this.$showToast({
          message: err.message
        })
      }) 
    },
    validate (data) {
      for(let key in data) {
        if (Reflect.has(this.formDataValidator, key)) {
          const res = this.formDataValidator[key](data[key], data.password)
          if (res.error !== 0) {
            this.$showToast({
              message: res.message
            })
            return false
          }
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  margin-top: $header-h;
  .content{
    background: #f5f5f5;
    width: 100%;
  }
}
.login-container{
  width: 100%;
  padding: .4rem 0;
  .login-content{
    width: 100%;
    background: #fff;
    .login-input{
      width: 100%;
      height: 1rem;
      display: flex;
      span{
        width: 1.5rem;
        height: 100%;
        line-height: 1rem;
        text-indent: .2rem;
      }
      input{
        flex: 1;
        height: 100%;
      }
    }
  }
  .login-btn{
    width: 100%;
    height: 1rem;
    margin-top: .4rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    .submit{
      width: 100%;
      height: 100%;
      background: $color-a;
      color: #fff;
      font-size: .32rem;
      border-radius: .1rem;
      line-height: 1rem;
      text-align: center;
      letter-spacing: .1rem;
    }
  }
  .login-desc{
    line-height: 1rem;
    text-align: right;
    font-size: .28rem;
    color: $color-a;
    padding-right: .2rem;
  }
}
</style>
