<!--
 * @Descripttion: 
 * @Author: 278096437@qq.com 李万春
 -->
<template>
<swiper :options="swiperOptions" class="swiper-container">
  <swiper-slide v-for="item of swiperList" :key="item">
    <img :data-src="item" class="swiper-lazy swiper-img">
    <div class="swiper-lazy-preloader"></div>
  </swiper-slide>
  <div class="swiper-pagination" slot="pagination"></div>
</swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        lazy: {
          loadPrevNext: true,
        }
      },
      swiperList: [
        'https://gw.alicdn.com/imgextra/i3/122/O1CN01r7ES9f1CluuJ07PvP_!!122-0-lubanu.jpg',
        'https://gw.alicdn.com/imgextra/i4/158/O1CN01ihDgt41D2PAQAuVfp_!!158-0-lubanu.jpg',
        'https://gw.alicdn.com/imgextra/i1/1550744/O1CN01zwJ2IE1HMnGAm7PnM_!!1550744-0-lubanu.jpg'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.swiper-container{
  width: 100%;
  height: 3rem;
  .swiper-img{
    width: 100%;
    height: 100%;
  }
  /deep/ .swiper-pagination-bullet-active{
    background: #ffffff;
  }
}

</style>
