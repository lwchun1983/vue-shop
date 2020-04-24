<template>
<div class="header-container">
  <div v-if="showIconMenu" class="icon-header">
    <span class="iconfont cell">&#xe6be;</span>
    <span class="iconfont cell">&#xe601;</span>
  </div>
  <div v-else class="menu-header border-bottom" :style="`opacity:${opacity}`">
    <span class="iconfont cell">&#xe6be;</span>
    <ul class="header-tab">
      <li :class="{active:scrollTab==='goods'}" @click="changeTab('goods')">商品</li>
      <li :class="{active:scrollTab==='comment'}" @click="changeTab('comment')">评论</li>
      <li :class="{active:scrollTab==='detail'}" @click="changeTab('detail')">详情</li>
    </ul>
    <span class="iconfont cell">&#xe601;</span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    showIconMenu: {
      type: Boolean,
      default: true
    },
    opacity: {
      type: Number,
      default: 1
    },
    scrollTab: String
  },
  methods: {
    changeTab (tabName) {
      this.$emit('tab', tabName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header-container{
  width: 100%;
  height: .88rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  .icon-header{
    width: 100%;
    height: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    @include layout-flex($justify: space-between);
    background: linear-gradient(rgba(0,0,0,.15),transparent);
    .cell{
      width: .6rem;
      height: .6rem;
      border-radius: 50%;
      background: rgba($color: #000000, $alpha: .3);
      @include layout-flex();
      color: #ffffff;
      font-size: .4rem;
    }
  }
  .menu-header{
    width: 100%;
    height: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    @include layout-flex($justify: space-between);
    background: #ffffff;
    color: $color-d;
    .cell{
      width: .6rem;
      height: .6rem;
      @include layout-flex();
      font-size: .4rem;
    }
    .header-tab{
      width: 0;
      flex: 1;
      margin: 0 .6rem;
      height: 100%;
      @include layout-flex();
      li{
        width: 33.33%;
        height: 100%;
        @include layout-flex();
        border-bottom: 2px solid #ffffff;
        box-sizing: border-box;
        &.active{
          color: $color-a;
          border-bottom: 2px solid $color-a;
        }
      }
    }
  }
}
</style>
