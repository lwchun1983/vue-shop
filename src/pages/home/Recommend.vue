<template>
<container title="精品推荐" morePath="/goods-list">
  <template v-slot:content>
    <div class="goods-list-container" ref="wrapper">
      <div class="goods-list" ref="recommend">
        <div class="goods-item border" v-for="item of recommendList" :key="item.id">
          <img v-lazy="item.img" class="goods-img">
          <div class="goods-info">
            <div class="goods-name">{{item.name}}</div>
            <div class="goods-price">￥{{item.price|formatPrice}}</div>
            <cart-btn font-size=".28rem" :goods="item"></cart-btn>
          </div>
        </div>
      </div>
    </div>
  </template>
</container>
</template>

<script>
import BScroll from 'better-scroll'
import { filters } from '@/utils/mixins'
import Container from './Container'
import CartBtn from '@/components/CartBtn'
export default {
  props: {
    recommendList: Array
  },
  components: {
    Container,
    CartBtn
  },
  mixins: [filters],
  watch: {
    recommendList (newList) {
      if (newList.length > 0) {
        this.$nextTick(() => {
          this.initScroll()
        })
      }
    }
  },
  data () {
    return {
      scroll: null,
      scrollOptions: {
        startX: 0,
        click: true,
        scrollX: true,
        scrollY: false,
        eventPassthrough: 'vertical' // 忽略竖直方向的滚动
      }
    }
  },
  methods: {
    initScroll () {
      const goodsListWidth = this.recommendList.length * 2.2
      this.$refs.recommend.style.width = goodsListWidth + 'rem'
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.wrapper, this.scrollOptions)
      } else {
        this.scroll.refresh() // 重新属性BScroll状态
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.goods-list-container{
  width: 100%;
  height: 3.2rem;
  margin-top: .2rem;
  overflow: hidden;
  .goods-list{
    height: 100%;
    @include layout-flex();
    .goods-item{
      width: 2rem;
      height: 100%;
      margin-right: .2rem;
      border-radius: .1rem;
      @include layout-flex(column);
      overflow: hidden;
      .goods-img{
        width: 100%;
        height: 2.08rem;
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
}

</style>
