<template>
<div class="page" v-if="show">
  <common-header title="订单详情" back="/user/order"></common-header>
  <div class="order-status">
    <span class="iconfont">&#xe614;</span>
    <span>买家{{order.statusInfo}}</span>
    <span>您的包裹已蓄势待发~</span>
  </div>
  <div class="address-container">
    <span class="iconfont position-icon">&#xe606;</span>
    <div class="address">
      <div class="address-detail">
        <div class="name">{{order.address.name}}<span>{{order.address.phone}}</span></div>
        <div class="address-content">{{addressContent}}</div>
      </div>
    </div>
  </div>
  <div class="cart-container">
    <div class="cart-item" v-for="item of order.goods" :key="item.id">
      <img :src="item.goods_img" class="cart-img"/>
      <div class="cart-desc">
        <div class="name">{{item.goods_name}}</div>
        <div class="price">{{item.goods_price}}</div>
        <div class="number">&times;{{item.buy_number}}</div>
      </div>
    </div>
    <div class="order-count">
      <div class="row">
        <span>商品总额</span>
        <span>￥{{order.goodsTotal.toFixed(2)}}</span>
      </div>
      <div class="row" v-if="order.coupon_money > 0">
        <span>优惠券抵扣</span>
        <span>-￥{{order.coupon_money.toFixed(2)}}</span>
      </div>
      <div class="row large">
        <span>实付款</span>
        <span class="total">￥{{order.total_price}}</span>
      </div>
    </div>

    <div class="order-count">
      <div class="row">
        <span>订单编号: {{order.order_no}}</span>
      </div>
      <div class="row">
        <span>订单状态: {{order.statusInfo}}</span>
      </div>
      <div class="row">
        <span>下单时间: {{order.create_time|dateFormat}}</span>
      </div>
      <div class="row" v-if="order.status > 1">
        <span>付款时间: {{order.create_time|dateFormat}}</span>
      </div>
      <div class="row" v-if="order.status > 2">
        <span>发货时间: {{order.update_time|dateFormat}}</span>
      </div>
      <div class="row" v-if="order.status > 3">
        <span>收货时间: {{order.update_time|dateFormat}}</span>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
import {getOrderStatus, dateFormat} from '@/utils/function'
export default {
  props: {
    id: Number
  },
  components: {
    CommonHeader
  },
  computed: {
    show () {
      return !!Object.keys(this.order).length
    },
    addressContent () {
      if (Object.keys(this.order).length === 0) {
        return ''
      }
      return `${this.order.address.province}${this.order.address.city}${this.order.address.area}${this.order.address.address}`
    }
  },
  data () {
    return {
      order: {}
    }
  },
  filters: {
    dateFormat (timestamp) {
      return dateFormat('YYYY-mm-dd HH:MM:SS', new Date(timestamp * 1000))
    }
  },
  mounted () {
    this.getOrder()
  },
  methods: {
    async getOrder () {
      const token = Token.getToken()
      const order = await this.axios.get('shose/order', {
        params: {
          id: this.id
        },
        headers: {
          token
        }
      }).then(res => res.order)
      order.statusInfo = getOrderStatus(order.status)
      order.coupon_money = parseFloat(order.coupon_money)
      order.goodsTotal = parseFloat(order.total_price) + order.coupon_money
      console.log(order)
      this.order = order
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
  background: $color-c;
  .order-status{
    width: 100%;
    height: 2.3rem;
    background: $color-a;
    @include layout-flex(column);
    color: #ffffff;
    font-size: .3rem;
    line-height: 1.3em;
    .iconfont{
      font-size: .8rem;
      margin-bottom: .4rem;
    }
  }
  .address-container{
    width: 100%;
    height: 1.2rem;
    background: #ffffff;
    padding: .2rem;
    box-sizing: border-box;
    @include layout-flex;
    .position-icon{
      color: $color-a;
      font-size: .7rem;
    }
    .address{
      width: 0;
      flex: 1;
      height: 100%;
      .address-detail{
        width: 100%;
        height: 100%;
        @include layout-flex(column, $align: flex-start);
        .name{
          line-height: .6rem;
          font-size: .32rem;
          color: $color-b;
          span{
            font-size: .24rem;
            color: $color-e;
            margin-left: .2rem;
          }
          .address-content{
            font-size: .24rem;
            color: $color-d;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
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
    .order-count{
      width: 100%;
      margin-top: .6rem;
      .row{
        width: 100%;
        height: .4rem;
        @include layout-flex(row, space-between);
        font-size: .2rem;
        color: $color-b;
        &.large{
          height: .6rem;
          font-size: .28rem;
          .total{
            color: $color-a;
          }
        }
      }
    }
  }
}

</style>
