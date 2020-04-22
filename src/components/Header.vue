<!--
 * @Descripttion: 
 * @Author: 278096437@qq.com 李万春
 -->
<template>
<div class="header">
  <span class="iconfont back" v-if="showBack" @click="toBack">&#xe6be;</span>
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
      type: String,
      default: ''
    }
  },
  computed: {
    showBack () {
      return this.back !== ''
    }
  },
  methods: {
    toBack () {
      if (this.back === '') {
        this.$router.push('/')
      } else {
        this.$router.push(this.back)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header{
  width: 100%;
  height: $header-h;
  background: $color-a;
  position: relative;
  text-align: center;
  line-height: $header-h;
  color: #fff;
  font-size: .36rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
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
