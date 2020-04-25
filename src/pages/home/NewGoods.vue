<template>
<container title="新品优选" morePath="/goods-list">
  <template v-slot:content>
    <div class="goods-list">
      <router-link tag="div" :to="`/goods-detail/${item.id}`" class="goods-item border" v-for="item of list" :key="item.id">
        <img v-lazy="item.img" class="goods-img">
        <div class="goods-info">
          <div class="goods-name">{{item.name}}</div>
          <div class="goods-price">￥{{item.price|formatPrice}}</div>
          <cart-btn font-size=".28rem" :goods="item"></cart-btn>
        </div>
      </router-link>
    </div>
  </template>
</container>
</template>

<script>
import Container from './Container'
import { filters } from '@/utils/mixins'
import CartBtn from '@/components/CartBtn'
export default {
  props: {
    newGoodsList: Array
  },
  components: {
    Container,
    CartBtn
  },
  mixins: [filters],
  watch: {
    newGoodsList (newList) {
      this.list = newList.slice(0, 3)
    }
  },
  data () {
    return {
      list: []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list{
  height: 3.2rem;
  margin-top: .2rem;
  @include layout-flex($justify:space-between);
  .goods-item{
    width: 2.2rem;
    height: 100%;
    border-radius: .1rem;
    @include layout-flex(column);
    overflow: hidden;
    .goods-img{
      width: 100%;
      height: 2.1rem;
    }
    .goods-info{
      height: 0;
      flex: 1;
      width: 90%;
      margin: .1rem 0 .2rem;
      @include layout-flex(column, space-between, flex-start);
      .goods-name{
        width: 100%;
        height: .3rem;
        line-height: .3rem;
        font-size: .2rem;
        color: $color-d;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 600;
      }
      .goods-price{
        font-weight: 600;
        font-size: .28rem;
        color: $color-a;
      }
    }
  }
}
</style>
