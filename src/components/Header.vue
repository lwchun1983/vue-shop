<!--
 * @Descripttion: 
 * @Author: 278096437@qq.com 李万春
 -->
<template>
<div class="header">
  <span class="iconfont back" v-if="back" @click="toBack">&#xe6be;</span>
  <span class="title">{{title}}</span>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'QianQian左右鞋包'
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toBack () {}
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header{
  width: 100%;
  height: .88rem;
  background: $color-a;
  position: relative;
  text-align: center;
  line-height: .88rem;
  color: #fff;
  font-size: .36rem;
  .back{
    display: block;
    width: 1rem;
    height: 100%;
    position: absolute;
    left: .2rem;
    top: 0;
    font-size: .4rem;
    text-align: left;
  }
}
</style>
