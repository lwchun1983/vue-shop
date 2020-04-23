<template>
<div class="goods-list">
  <div class="goods-item" v-for="item of list" :key="item.id">
    <img class="goods-img" :src="item.img">
    <div class="goods-desc">
      <div class="goods-name">{{item.name}}</div>
      <div class="goods-price">
        ￥{{item.price|formatPrice}}
        <span class="market-price">￥{{item.market_price|formatPrice}}</span>
      </div>
      <div class="goods-sales">{{item.sale_num}}人购买</div>
      <cart-btn :goods="item"></cart-btn>
    </div>
  </div>
</div>
</template>

<script>
import {filters} from '@/utils/mixins'
import CartBtn from '@/components/CartBtn'
export default {
  props: {
    list: Array
  },
  mixins: [filters],
  components: { CartBtn }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list{
  width: 100%;
  padding: 0 .2rem;
  box-sizing: border-box;
}
.goods-item{
  width: 100%;
  height: 2.2rem;
  padding: .2rem 0;
  display: flex;
}
.goods-img{
  width: 2.2rem;
  height: 2.2rem;
  border-radius: .1rem;
  margin-left: .2rem;
}
.goods-desc{
  flex: 1;
  width: 0;
  padding: .2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}
.goods-name{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: .32rem;
  font-weight: 700;
  color: #333;
}
.goods-price{
  width: 100%;
  font-size: .36rem;
  font-weight: 700;
  color: #ff5e46;
  line-height: .4rem;
  margin-top: .7rem;
}
.goods-price .market-price{
  color: #999;
  text-decoration: line-through;
  font-weight: 400;
  font-size: .3rem; 
}
.goods-sales{
  color: #999;
  font-size: .28rem;
}
</style>
