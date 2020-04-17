<template>
<div class="page">
  <common-header></common-header>
  <search-bar></search-bar>
  <home-swiper :swiperList="swiperList"></home-swiper>
  <icon-nav :navList="navList"></icon-nav>
  <recommend :recommendList="recommendList"></recommend>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import HomeSwiper from './Swiper'
import IconNav from './IconNav'
import Recommend from './Recommend'
export default {
  components: {
    CommonHeader,
    SearchBar,
    HomeSwiper,
    IconNav,
    Recommend
  },
  data () {
    return {
      swiperList: [],
      navList: [],
      recommendList: []
    }
  },
  mounted () {
    this.getSwiper()
    this.getIconNav()
    this.getRecommend()
  },
  methods: {
    async getSwiper () {
      const res = await this.axios.get('api/swiper?type=1')
      this.swiperList = res.map(item => item.img)
    },
    async getIconNav () {
      this.navList = await this.axios.get('api/navigate?type=1')
    },
    async getRecommend () {
      this.recommendList = await this.axios.get('api/goods/recommend?type=1')
      console.log(this.recommendList)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  background: $color-c;
}
</style>
