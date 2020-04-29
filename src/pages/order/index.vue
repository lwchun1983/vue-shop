<template>
<div class="page">
  <common-header title="确认订单" back="/cart"></common-header>
  <order-address :address="address"></order-address>
  <div class="cart-container">
    <div class="cart-item" v-for="item of cart" :key="item.id">
      <img :src="item.img" class="cart-img"/>
      <div class="cart-desc">
        <div class="name">{{item.name}}</div>
        <div class="price">{{item.price}}</div>
        <div class="number">&times;{{item.buyNumber}}</div>
      </div>
    </div>
  </div>
  <div class="coupon-container">
    <div class="coupon-item" v-for="item of coupon" :key="item.id" @click="chooseCoupon(item.id)">
      <span class="iconfont">&#xe605;</span>
      <div class="coupon-content">
        使用￥{{item.money}}元优惠券
      </div>
      <span class="iconfont">{{item.selected?'&#xe640;':'&#xe61f;'}}</span>
    </div>
  </div>
  <div class="order-submit border-top">
    共{{cartNum}}件商品，合计: {{actualPayment}}
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import OrderAddress from './Address'
import {Token} from "@/utils/token"
import {Storage} from "@/utils/storage"
const USER_TOKEN = Token.getToken()
export default {
  components: {
    CommonHeader,
    OrderAddress
  },
  data () {
    return {
      address: {},
      cart: [],
      coupon: [],
      addressId: 0,
      laodAddress: false,
      selectCouponId: 0,
      total: 0,
      cartNum: 0,
      actualPayment: 0
    }
  },
  // watch: {
  //   async addressId () {
  //     this.$showLoading()
  //     await this.getUserAddress()
  //     this.$hideLoading()
  //   }
  // },
  async mounted () {
    this.addressId = this.$route.query.selectAddressId || 0
    this.initCart()
    try {
      this.$showLoading()
      // const address = Storage.getItem('address') || {}
      // if (Object.keys(address).length === 0) {
      //   await this.getUserAddress()
      // } else {
      //   if (this.addressId === address.id) {
      //     this.address = address
      //   } else {
      //     await this.getUserAddress()
      //   }
      // }
      await this.getUserAddress()
      await this.getUserCoupon()
    } catch (err) {
      console.log(err)
    } finally {
      this.$hideLoading()
    }
    // Promise.all([this.getUserAddress(), this.getUserCoupon()]).finally(() => {
    //   this.$hideLoading()
    // })  
  },
  methods: {
    chooseCoupon (couponId) {
      // const index = this.coupon.findIndex(item => item.id === couponId)
      // if (index > -1) {
      //   this.coupon[index].selected = !this.coupon[index].selected
      // }
      if (this.selectCouponId != 0 && this.selectCouponId !== couponId) {
        this.actualPayment = this.total
      }
      this.selectCouponId = couponId
      this.coupon.forEach(item => {
        if (item.id === couponId) {
          const currentSelect = !item.selected
          const money = parseFloat(item.money)
          item.selected = currentSelect
          if (currentSelect) {
            this.actualPayment -= money
          } else {
            this.actualPayment += money
          }
        } else {
          item.selected = false
        }
      })
    },
    initCart () {
      let cartAll = Storage.getItem('cart')
      let total = 0
      let cartNum = 0
      let cart = []
      cartAll.map(item => {
        if (item.selected) {
          total += item.buyNumber * item.price
          cartNum++
          cart.push(item)
        }
      })
      console.log(cart)
      if (cart.length === 0) {
        this.$showToast({
          message: '至少选择一个商品',
          callback: () => {
            this.$router.push('/cart')
          }
        })
        return
      }
      this.cart = cart
      this.total = total
      this.cartNum = cartNum
      this.actualPayment = total
    },
    async getUserAddress () {
      const address = await this.axios.get('shose/address/default', {
        headers: {
          token: USER_TOKEN
        },
        params: {
          id: this.addressId
        }
      })
      this.address = address || {}
    
      Storage.setItem('address', this.address)
    },
    async getUserCoupon () {
      const coupon = await this.axios.get('shose/coupon/get', {
        headers: {
          token: USER_TOKEN
        }
      }).then(res => res.coupon)

      this.coupon = coupon.map(item => {
        if (item.is_use === 0 && item.expires_time*1000 > Date.now()) {
          item.selected = false
          return item
        }
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
  padding: $header-h .2rem .9rem;
  box-sizing: border-box;
  background: $color-c;
  .cart-container{
    width: 100%;
    background: #ffffff;
    padding: .2rem;
    box-sizing: border-box;
    border-radius: .1rem;
    margin-top: .2rem;
    .cart-item{
      width: 100%;
      height: 1.8rem;
      @include layout-flex;
      margin-bottom: .2rem;
      .cart-img{
        width: 1.8rem;
        height: 1.8rem;
      }
      .cart-desc{
        width: 0;
        flex: 1;
        margin-left: .2rem;
        height: 80%;
        @include layout-flex(column, space-between, flex-start);
        font-size: .28rem;
        color: $color-d;
        .number{
          font-size: .24rem;
          color: $color-e;
        }
      }
    }
  }
  .coupon-container{
    width: 100%;
    .coupon-item{
      width: 100%;
      height: .76rem;
      background: #ffffff;
      border-radius: .38rem;
      margin-top: .2rem;
      padding: .2rem;
      box-sizing: border-box;
      @include layout-flex;
      .iconfont{
        color: $color-a;
        font-size: .36rem;
      }
      .coupon-content{
        width: 0;
        flex: 1;
        height: 100%;
        margin: 0 .2rem;
        color: $color-d;
        font-size: .28rem;
        line-height: .36rem;
      }
    }
  }
  .order-submit{
    width: 100%;
    height: .9rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background: #ffffff;
    @include layout-flex;
    font-size: .36rem;
  }
}
</style>
