<template>
  <transition name="fade">
    <div class="toast-container" v-if="visible">
      <div class="mask" v-if="mask"></div>
      <div class="toast-txt">{{message}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      message: '',
      mask: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.toast-container{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: rgba($color: #000000, $alpha: .3);
  }
  .toast-txt{
    padding: .2rem;
    color: #fff;
    font-size: .28rem;
    text-align: center;
    background: rgba(0,0,0,.7);
    border-radius: .1rem;
    text-align: center;
    position: fixed;
    top: 40%;
    left: 50%;
    z-index: 999;
    transform: translate(-50%, -50%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
