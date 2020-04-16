<!--
 * @Descripttion: 项目入口
 * @Author: 278096437@qq.com 李万春
 -->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  const fontSize = window.innerWidth / 7.5
  html.style.fontSize = fontSize + 'px'
})
export default {}
</script>
<style lang="scss">
@import "./assets/scss/reset";
@import "./assets/scss/border";
@import "./assets/scss/iconfont";
</style>
