<template>
<div class="page">
  <common-header title="签到" back="/user"></common-header>
  <div class="sign-week-container">
    <div class="sign-week">
      <div class="sign-day" v-for="item of signDays" :key="item.day">
        <div class="week" :class="{active:item.isToday}">{{item.week}}</div>
        <div class="day" :class="{active:item.hasData,today:item.isToday}">{{item.day}}</div>
      </div>
    </div>
  </div>
  <div class="user-level-container" v-show="show">
    <div class="user-level-wrapper">
      <div class="user-level-text">
        <span>已连续签到<em class="serial-sign">{{userLevel.serial_sign}}</em>天</span>
        <span v-if="canSign" @click="userSign">签到</span>
      </div>
      <div class="user-level-progress">
        <div class="user-level-points">
          <span>{{userLevel.level_points}}</span>
          <span>{{userLevel.next_level_points}}</span>
        </div>
        <div class="user-points" ref="points">{{userLevel.points}}</div>
        <progress :value="userLevel.points" class="mypro" :max="userLevel.next_level_points"></progress>
        <div class="user-level-points">
          <span>lv{{userLevel.level}}</span>
          <span>lv{{userLevel.next_level}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
export default {
  components: {
    CommonHeader
  },
  data () {
    return {
      signDays: [],
      userLevel: {},
      canSign: true,
      points: 30,
    }
  },
  computed: {
    show () {
      return !!Object.keys(this.userLevel).length
    }
  },
  watch: {
    // userLevel: {
    //   handler(value) {
    //     console.log(value)
    //   },
    //   deep: true
    // }
    'userLevel.points' (value) {
      if (Object.keys(this.userLevel).length > 0) {
        const total = this.userLevel.next_level_points
        const per = (value/total) * 100
        this.$refs.points.style.left = per + '%'
        if (per > 10) {
          this.$refs.points.style.display = 'block'
        } else {
          this.$refs.points.style.display = 'none'
        }
      }
    }
  },
  mounted () {
    this.getUserSign()
  },
  methods: {
    userSign () {
      this.$showLoading()
      const token = Token.getToken()
      this.axios.post('shose/user/sign', {}, {
        headers: {
          token
        }
      }).then(() => {
        this.$showToast({
          message: '签到成功',
          callback: () => {
            this.getUserSign()
          }
        })
      }).catch(err => {
        this.$showToast({
          message: err.message
        })
      }).finally(() => {
        this.$hideLoading()
      })
    },
    async getUserSign () {
      const token = Token.getToken()
      const res = await this.axios.get('shose/user/sign', {
        headers: {
          token
        }
      })
      const today = new Date().getDate()
      const signDays = res.list.map(item => {
        item.day = parseInt(item.day)
        item.isToday = false
        if (today === item.day) {
          item.isToday = true
          this.canSign = !item.hasData
        }
        return item
      })
      this.signDays = signDays
      this.userLevel = res.user
      
      console.log(res)
      console.log(signDays)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  margin-top: $header-h;
  .sign-week-container{
    width: 100%;
    height: .88rem;
    padding-top: .2rem;
    .sign-week{
      width: 100%;
      height: 100%;
      padding: 0 .6rem;
      box-sizing: border-box;
      @include layout-flex;
      .sign-day{
        width: 14.2857%;
        height: 100%;
        @include layout-flex(column,space-between);
        color: $color-e;
        .week{
          width: 100%;
          height: 50%;
          @include layout-flex;
          font-size: .3rem;
          &.active{
            color: $color-b;
          }
        }
        .day{
          width: .4rem;
          height: .4rem;
          @include layout-flex;
          font-size: .26rem;
          border-radius: 50%;
          &.active{
            background: $color-a;
            color: #ffffff;
            &.today{
              color: #ffffff;
            }
          }
          &.today{
            color: $color-b;
          }
        }
      }
    }
  }
  .user-level-container{
    width: 100%;
    margin-top: .6rem;
    padding: 0 .4rem;
    height: 2.54rem;
    box-sizing: border-box;
    .user-level-wrapper{
      width: 100%;
      height: 100%;
      background: $color-a;
      border-radius: .1rem;
      color: #ffffff;
      padding: 0 .2rem;
      box-sizing: border-box;
      .user-level-text{
        width: 100%;
        height: 1rem;
        @include layout-flex(row, space-between);
        font-size: .3rem;
        .serial-sign{
          font-size: .5rem;
          margin: 0 .04rem;
        }
      }
      .user-level-progress{
        width: 100%;
        height: 1.5rem;
        @include layout-flex(column);
        position: relative;
        .user-points{
          font-size: .3rem;
          padding: 0 .2rem;
          height: .4rem;
          line-height: .4rem;
          background: #eecf8b;
          border-radius: .06rem;
          position: absolute;
          left: 0;
          top: .2rem;
          transform: translateX(-50%);
          &::after{
            content: "";
            width: 0;
            height: 0;
            border-width: .1rem;
            border-color: #eecf8b transparent transparent transparent;
            border-style: solid;
            display: block;
            position: absolute;
            left: 50%;
            top: .4rem;
            transform: translateX(-50%);
          }
        }
        .user-level-points{
          width: 100%;
          @include layout-flex(row, space-between);
          height: .5rem;
          font-size: .3rem;
        }
        .mypro{
          background: #ffffff;
          width: 100%;
          height: .1rem;
          margin: .2rem 0;
          border-radius: .05rem;
          appearance: none;
          -webkit-appearance: none;
        }
        ::-ms-fill{
          background: #eecf8b;
          border-radius: .05rem;
        }
        ::-moz-progress-bar{
          background:  #eecf8b;
          border-radius: .05rem;
        }
        ::-webkit-progress-bar{
          background: #ffffff;
          border-radius: .05rem;
        }
        ::-webkit-progress-value{
          background:  #eecf8b;
          border-radius: .05rem;
        }
      }
    }
  }
}
</style>
