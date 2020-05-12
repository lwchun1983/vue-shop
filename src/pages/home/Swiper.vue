<!--
 * @Descripttion: 
 * @Author: 278096437@qq.com 李万春
 -->
<template>
<swiper :options="swiperOptions" class="swiper-container" v-if="show">
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
  props: {
    swiperList: Array
  },
  computed: {
    show () {
      return !!this.swiperList.length
    }
  },
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
      }
    }
  },
  mounted () {
    // let arr = [1,22,11,8,10,16,10,7,29,17]
    // const len = arr.length
    // let tmp
    // for(let i=0; i<len;i++) {
    //   for (let j=i+1;j<len;j++) {
    //     if (arr[i] < arr[j]) {
    //       tmp = arr[i]
    //       arr[i] = arr[j]
    //       arr[j] = tmp
    //     }
    //   }
    // }
    // arr = this.sort(arr)
    // console.log(arr)
  },
  methods: {
    sort(arr) {
      if (arr.length <= 1) {
        //递归出口
        return arr
      }
      let middleIndex = Math.floor(arr.length / 2)
      let middle = arr.splice(middleIndex, 1)[0]
      let left = []
      let right = []
      for(let i = 0;i < arr.length; i++){
        if(arr[i] < middle){
          left.push(arr[i])
        }else{
          right.push(arr[i])
        }
      }
      return this.sort(left).concat([middle], this.sort(right))
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
