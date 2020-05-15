<template>
<div class="page">
  <common-header title="我的卡券" back="/user"></common-header>
  <div class="coupon-list">
    <div class="coupon-item" :class="'coupon-bg' + item.status" v-for="item of coupon" :key="item.id" >
      <div class="coupon-info">
        <div class="coupon-title">
          <div class="coupon-money">
            ￥<span class="money">{{item.couponMoney}}</span>
          </div>
          <div class="coupon-desc">
            优惠券
          </div>
        </div>
        <div class="coupon-time">
          {{item.startTime}}-{{item.endTime}}
        </div>
      </div>
      <div class="coupon-status">
        <div class="status-text">{{item.statusText}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from "@/utils/token"
import {dateFormat} from "@/utils/function"
export default {
  components: {
    CommonHeader
  },
  data () {
    return {
      coupon: [],
    }
  },
  mounted () {
    this.getUserCoupon()
  },
  methods: {
    async getUserCoupon () {
      const token = Token.getToken()
      const coupon = await this.axios.get('shose/coupon/get', {
        headers: {
          token
        }
      }).then(res => res.coupon)
      const statusOptions = ['', '优惠抵扣', '已经失效', '已经使用']
      this.coupon = coupon.map(item => {
        let status = 0
        if (item.is_use === 1) {
          status = 3
        } else {
          if (Date.now() > item.expires_time * 1000) {
            status = 2
          } else {
            status = 1
          }
        }
        console.log(status)
        item.status = status
        item.couponMoney = parseInt(item.money)
        item.statusText = statusOptions[status] || ''
        item.startTime = dateFormat('YYYY.mm.dd', new Date(item.get_time * 1000))
        item.endTime = dateFormat('YYYY.mm.dd', new Date(item.expires_time * 1000))
        return item
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  padding-top: $header-h;
  box-sizing: border-box;
  background: #ffffff;
  .coupon-list{
    width: 100%;
    @include layout-flex(column);
    .coupon-item{
      width: 5.8rem;
      height: 2.34rem;
      margin-top: .2rem;
      @include layout-flex;
      &.coupon-bg1{
        background: url('~@/assets/images/user-coupon-bg1.png');
        background-size: contain;
        .coupon-status{
          color: #ff5e46;
        }
      }
      &.coupon-bg2{
        background: url('~@/assets/images/user-coupon-bg3.png');
        background-size: contain;
        .coupon-status{
          color: #999999;
        }
      }
      &.coupon-bg3{
        background: url('~@/assets/images/user-coupon-bg2.png');
        background-size: contain;
        .coupon-status{
          color: #ff7c76;
        }
      }
      .coupon-info{
        width: 3.4rem;
        height: 100%;
        @include layout-flex(column);
        color: #ffffff;
        .coupon-title{
          width: 2.4rem;
          height: .7rem;
          @include layout-flex(row, center, baseline);
          margin-top: .2rem;
          .coupon-money{
            font-size: .48rem;
            .money{
              font-size: .72rem;
              font-weight: bold;
            }
          }
          .coupon-desc{
            font-size: .32rem;
            margin-left: .3rem;
          }
        }
        .coupon-time{
          width: 2.6rem;
          font-size: .22rem;
          margin-top: .5rem;
        }
      }
      .coupon-status{
        width: 2.4rem;
        height: 100%;
        @include layout-flex;
        .status-text{
          width: 1rem;
          font-size: .5rem;
          font-weight: bold;
          line-height: 1.2em;
        }
      }
    }
  }
}
</style>
