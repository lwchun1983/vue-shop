<template>
<div>
  <common-header></common-header>
  <search-bar></search-bar>
  <home-swiper></home-swiper>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import HomeSwiper from './Swiper'
export default {
  components: {
    CommonHeader,
    SearchBar,
    HomeSwiper
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
</style>
