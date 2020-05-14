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
    <div class="order-count">
      共{{cartNum}}件商品，
      <span class="order-total">合计: <em>￥{{actualPayment.toFixed(2)}}</em></span>
    </div>
    <button class="order-btn" @click="submitOrder">提交订单</button>
  </div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import OrderAddress from './Address'
import {Token} from "@/utils/token"
import {Storage} from "@/utils/storage"

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
      actualPayment: 0,
      isQuikBuy: 0
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isQuikBuy === 1) {
      this.$store.dispatch('setBuyCart', null)
    }
    next()
  },
  async mounted () {
    this.addressId = this.$route.query.selectAddressId || 0
    this.initCart()
    this.$showLoading()
    Promise.all([this.getUserAddress(), this.getUserCoupon()]).finally(() => {
      this.$hideLoading()
    })  
  },
  methods: {
    chooseCoupon (couponId) {
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
      // 是否是立即购买
      this.isQuikBuy = parseInt(this.$route.query.buy || 0)
      let total = 0
      let cartNum = 0
      let cart = []
      if (this.isQuikBuy === 1) {
        const buyCart = this.$store.state.buyCart
        if (Object.keys(buyCart).length > 0) {
          cart.push(buyCart)
        }
      } else {
        let cartAll = Storage.getItem('cart')
        cart = cartAll.filter(item => item.selected)
      }
      if (cart.length === 0) {
        this.$showToast({
          message: '至少选择一个商品',
          callback: () => {
            this.$router.push('/cart')
          }
        })
        return
      }
      cart.forEach(item => {
        total += item.buyNumber * item.price
        cartNum++
      })
      this.cart = cart
      this.total = total
      this.cartNum = cartNum
      this.actualPayment = total
    },
    async getUserAddress () {
      const userAddress = Storage.getItem('address') || {}
      if (Object.keys(userAddress).length > 0) {
        this.address = userAddress
        return
      }
      const  token = Token.getToken()
      const address = await this.axios.get('shose/address/default', {
        headers: {
          token
        },
        params: {
          id: this.addressId
        }
      })
      this.address = address || {}
      Storage.setItem('address', this.address)
    },
    async getUserCoupon () {
      const userCoupon = Storage.getItem('userCoupon') || []
      if (userCoupon.length > 0) {
        this.coupon = userCoupon.filter(item => item.is_use === 0 && item.expires_time*1000 > Date.now())
        return
      }
      const  token = Token.getToken()
      const coupon = await this.axios.get('shose/coupon/get', {
        headers: {
          token
        }
      }).then(res => res.coupon.map(item => {
        item.selected = false
        return item
      }))
      this.coupon = coupon.filter(item => item.is_use === 0 && item.expires_time*1000 > Date.now())
      Storage.setItem('userCoupon', this.coupon)
    },
    async submitOrder () {
      const token = Token.getToken()
      if (token === '') {
        this.$router.push('/login?url=' + encodeURIComponent('/order'))
        return
      }
      const address = Storage.getItem('address') || {}
      if (Object.keys(address).length === 0) {
        this.$showToast({
          message: '请选择收货地址'
        })
        return
      }
      if (this.cart.length === 0) {
        this.$showToast({
          message: '请选择商品'
        })
        return
      }
      const data = {}
      data.address_id = parseInt(address.id)
      data.goods = []
      this.cart.forEach(item => {
        data.goods.push({
          goods_id: item.id,
          count: item.buyNumber
        })
      })
      if (this.coupon.length > 0) {
        const selectCoupon = this.coupon.filter(item => item.selected)
        if (selectCoupon.length > 0) {
          data.coupon_id = selectCoupon[0].id
        }
      }
      try {
        this.$showLoading()
        const res = await this.axios.post('shose/order', data, {
          headers: {
            token
          }
        })
        if (res.pass) {
          if (this.this.isQuikBuy === 1) {
            this.$store.dispatch('setBuyCart', null)
          } else {
            // 删除购物车中购买成功的商品
            const cartAll = Storage.getItem('cart')
            const cart = cartAll.filter(item => {
              const index = this.cart.findIndex(val => item.id === val.id)
              return index === -1
            })
            if (cart.length > 0) {
              Storage.setItem('cart', cart)
            } else {
              Storage.deleteItem('cart')
            }
          }
          // 清空优惠券信息
          Storage.deleteItem('userCoupon')
          this.$router.replace('/order/pay?id=' + res.order_id)
        }
      } catch (error) {
        this.$showToast({
          message: error.message,
          callback: () => {
            this.$router.replace('/cart')
          }
        })
      }finally {
        this.$hideLoading()
      }
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
    .order-count{
      width: 0;
      flex: 1;
      height: 100%;
      font-size: .24rem;
      color: $color-e;
      @include layout-flex($justify: flex-end);
      .order-total{
        font-size: .32rem;
        color: $color-b;
        em{
          font-size: .36rem;
          color: $color-a;
        }
      }
    }
    .order-btn{
      width: 1.8rem;
      height: .6rem;
      background: $color-a;
      color: #ffffff;
      border-radius: .3rem;
      border: none;
      margin: 0 .2rem;
      font-size: .3rem;
    }
  }
}
</style>
