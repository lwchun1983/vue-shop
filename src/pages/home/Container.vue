<template>
<div class="container">
  <div class="title">
    <span>{{title}}</span>
    <span class="iconfont more" v-if="show">更多 &#xe654;</span>
  </div>
  <slot name="content"></slot>
</div>
</template>

<script>
export default {
  props: {
    title: String,
    morePath: {
      type: String,
      default: ''
    } 
  },
  computed: {
    show () {
      return this.morePath.trim() !== ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
  @include container-layout;
  .title{
    width: 100%;
    @include layout-flex($justify: space-between);
    height: .32rem;
    border-left: .06rem solid $color-a;
    text-indent: .2rem;
    color: $color-b;
    font-size: .32rem;
    font-weight: 600;
    .more{
      font-size: .24rem;
      color: $color-d;
      font-weight: 400;
    }
  }
}
</style>
