<template>
  <div class="container">
    <div class="detail">
      <div class="goods-price">￥<em>{{goods.goods_price}}</em></div>
      <div class="market-price">价格：<span>￥{{goods.market_price}}</span></div>
      <div class="goods-name">{{goods.goods_name}}</div>
      <div class="goods-notice">
        <span>月销量 {{goods.sale_num}}件</span>
        <span>库存 {{goods.stock}}件</span>
      </div>
    </div>
    <div class="favourable">
      <div class="item" @click="getCoupon">
        <span class="title">优惠</span>
        <p>领取优惠券</p>
        <div class="right">领取 <span class="iconfont">&#xe637;</span></div>
      </div>
      <div class="item">
        <span class="title">促销</span>
        <p v-if="goods.point > 0"><i>积分</i>购买可得{{goods.point}}积分</p>
        <div class="right"><span class="iconfont">&#xe637;</span></div>
      </div>
      <div class="item">
        <span class="title">服务</span>
        <p>
          <span>假一赔四</span>
          <span>30天质保+</span>
          <span>极速退款</span>
        </p>
        <div class="right"><span class="iconfont">&#xe637;</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props: {
    goods: Object
  },
  methods: {
    getCoupon () {
      // 判断是否登录
      const url = encodeURIComponent('/goods-detail/' + this.goods.goods_id)
      this.$router.push(`/coupon?url=${url}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.detail{
  width: 100%;
  height: auto;
  padding: .2rem;
  box-sizing: border-box;
  background: #fff;
  .goods-price{
    color: #FF0036;
    height: .72rem;
    line-height: .72rem;
    font-size: .32rem;
    em{
      font-size: .48rem;
    }
  }
  .market-price{
    font-size: .24rem;
    height: .4rem;
    line-height: .4rem;
    color: #888;
    span{
      text-decoration: line-through;
    }
  }
  .goods-name{
    font-size: .28rem;
    color: #051B28;
    line-height: .4rem;
  }
  .goods-notice{
    font-size: .24rem;
    color: #999;
    line-height: .4rem;
    display: flex;
    justify-content: space-between;
  }
}
.favourable{
  width: 100%;
  height: auto;
  padding: .2rem;
  box-sizing: border-box;
  background: #fff;
  margin-top: .2rem;
  .item{
    width: 100%;
    height: .88rem;
    line-height: .88rem;
    display: flex;
    justify-content: space-between;
    font-size: .24rem;
    .title,.right{
      color: #999;
    }
    >p{
      width: 0;
      flex: 1;
      margin: 0 .2rem;
      display: flex;
      span{
        width: 33.33%;
      }
      i{
        color: #FF0036;
        font-size: .2rem;
        margin-right: .2rem;
        transform: scale(.7);
      }
    }
  }
}
</style>
