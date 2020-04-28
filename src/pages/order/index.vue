<template>
<div class="page">
  <common-header title="确认订单" back="/cart"></common-header>
  <order-address :address="address"></order-address>
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
      coupon: []
    }
  },
  mounted () {
    this.initCart()
    this.getUserAddress()
    this.getUserCoupon()
  },
  methods: {
    initCart () {
      let cart = Storage.getItem('cart')
      cart = cart.filter(item => item.selected)
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
    },
    async getUserAddress () {
      const address = await this.axios.get('shose/address/default', {
        headers: {
          token: USER_TOKEN
        }
      })
      this.address = address || {}
    },
    async getUserCoupon () {
      const coupon = await this.axios.get('shose/coupon/get', {
        headers: {
          token: USER_TOKEN
        }
      }).then(res => res.coupon)

      this.coupon = coupon.filter(item => {
        let result
        if (item.is_use === 1) {
          result = false
        } else {
          result = item.expires_time*1000 > Date.now()
        }
        return result
      })
      console.log(this.coupon)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  padding: $header-h .2rem 0;
  box-sizing: border-box;
  background: $color-c;
}
</style>
