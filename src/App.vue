<!--
 * @Descripttion: 项目入口
 * @Author: 278096437@qq.com 李万春
 -->
<template>
  <div id="app">
    <!-- <keep-alive exclude="goodsCategory">
      <router-view />
    </keep-alive> -->
    <router-view />
  </div>
</template>
<script>
// document.addEventListener('DOMContentLoaded', () => {
//   const html = document.querySelector('html')
//   const fontSize = window.innerWidth / 7.5
//   html.style.fontSize = fontSize + 'px'
// })

function fn1 (doc, win) {
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  const recalc = function() {
      var clientWidth = docEl.clientWidth
      if (!clientWidth) {
        return
      }
      docEl.style.fontSize =  clientWidth / 7.5 + 'px'
    }
  if (!doc.addEventListener) {
    return
  }
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
}

fn1(document, window)


export default {}
</script>
<style lang="scss">
@import "./assets/scss/reset";
@import "./assets/scss/border";
@import "./assets/scss/iconfont";
</style>
