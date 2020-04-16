<!--
 * @Descripttion: 
 * @Author: 278096437@qq.com 李万春
 -->
<template>
<div class="container">
  <div class="search">
    <span class="iconfont">&#xe691;</span>
    {{placeHolder}}
  </div>
</div>
</template>

<script>
export default {
  props: {
    placeHolder: {
      type: String,
      default: '搜索商品名称'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
  width: 100%;
  height: .88rem;
  padding: .15rem .4rem;
  box-sizing: border-box;
  background: $color-a;
  .search{
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: .3rem;
    text-align: center;
    line-height: .58rem;
    color: #b2b2b2;
    font-size: .26rem;
  }
}
</style>

