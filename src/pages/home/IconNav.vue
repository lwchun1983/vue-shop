<template>
<div class="nav-container">
  <router-link tag="div" :to="'/goods-list?cname=' + item.name" v-for="item of list" :key="item.id" class="nav-item">
    <img :src="item.img" class="nav-img">
    <span>{{item.name}}</span>
  </router-link>
</div>
</template>

<script>
export default {
  props: {
    navList: Array
  },
  watch: {
    navList (newList) {
      this.list = newList.slice(0, 8)
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
.nav-container{
  width: 100%;
  height: 3.9rem;
  padding: .3rem .2rem;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  background: #ffffff;
  .nav-item{
    width: 25%;
    height: 50%;
    @include layout-flex(column);
    color: $color-b;
    font-size: .26rem;
    .nav-img{
      width: .9rem;
      height: .9rem;
      margin-bottom: .2rem;
    }
  }
}
</style>
