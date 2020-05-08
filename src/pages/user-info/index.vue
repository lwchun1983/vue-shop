<template>
<div class="page">
  <common-header title="会员信息" back="/user"></common-header>
  <div class="user-info">
    <div class="row border-bottom">
      <label>头像：</label>
      <div class="row-content">
        <img :src="user.avatar" class="user-avatar">
      </div>
    </div>
    <div class="row border-bottom">
      <label>账号：</label>
      <div class="row-content">
        <span>{{user.username}}</span>
      </div>
    </div>
    <div class="row border-bottom">
      <label>级别：</label>
      <div class="row-content">
        <span>LV{{user.level}}</span>
      </div>
    </div>
    <div class="row border-bottom">
      <label>积分：</label>
      <div class="row-content">
        <span>{{user.points}}</span>
      </div>
    </div>
    <div class="row border-bottom">
      <label>昵称：</label>
      <div class="row-content">
        <input type="text" placeholder="请输入昵称" v-model.trim="user.nickname">
      </div>
    </div>
    <div class="row border-bottom">
      <label>性别：</label>
      <div class="row-content">
        <label><input type="radio" class="radio" value="0" v-model="user.sex"> 隐藏</label>
        <label><input type="radio" class="radio" value="1" v-model="user.sex"> 男</label>
        <label><input type="radio" class="radio" value="2" v-model="user.sex"> 女</label>
      </div>
    </div>
    <div class="row border-bottom">
      <label>生日：</label>
      <div class="row-content" @click="chooseBorn">
        {{user.born || '请选择'}}
      </div>
    </div>
    <div class="submit-btn">
      <div class="submit" @click="saveUser">提交</div>
    </div>
  </div>
  <awesome-picker
    ref="picker"
    type="date"
    colorConfirm="#ff5e46"
    @confirm="handlePickerConfirm">
  </awesome-picker>
</div>
</template>

<script>
import {mapState} from 'vuex'
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
export default {
  components: {
    CommonHeader
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    chooseBorn () {
      this.$refs.picker.show()
    },
    handlePickerConfirm (data) {
      console.log(data)
      this.user.born = `${data[0].value}${data[1].value}${data[2].value}`
    },
    saveUser () {
      if (this.user.nickname === '') {
        this.$showToast({
          message: '昵称不能为空'
        })
        return
      }
      const data = new FormData()
      data.append('nickname', this.user.nickname)
      data.append('sex', this.user.sex)
      data.append('born', this.user.born)
      const token = Token.getToken()
      this.$showLoading()
      this.axios.post('shose/user/update', data, {
        headers: {
          token
        }
      }).then(() => {
         this.$showToast({
          message: '修改成功',
          callback: () => {
            this.$router.push('/user')
          }
        })
      }).catch(err => {
        this.$showToast({
          message: err.message
        })
      }).finally(() => {
        this.$hideLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  margin-top: $header-h;
  .user-info{
    width: 100%;
    .row{
      width: 100%;
      height: .9rem;
      padding: 0 .2rem;
      box-sizing: border-box;
      @include layout-flex;
      .row-content{
        width: 0;
        flex: 1;
        height: 100%;
        margin-left: .2rem;
        @include layout-flex(row, flex-end);
        .user-avatar{
          width: .8rem;
          height: .8rem;
          border-radius: 50%;;
        }
        input{
          text-align: right;
        }
      }
    }
  }
  .submit-btn{
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
}

.radio{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: .3rem;
  height: .3rem;
  background: url(/images/radio.png) no-repeat;
  outline: none;
  background-size: contain;
}
.radio:checked{
  background: url(/images/radio@checked.png) no-repeat left bottom;
  background-size: contain;
}

</style>
