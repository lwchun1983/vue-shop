<template>
<transition name="fade">
  <div class="container" v-if="visible">
    <div class="modal">
      <div class="modal-title" v-if="title !== ''">{{title}}</div>
      <div class="modal-content" v-if="content !== ''">{{content}}</div>
      <div class="modal-btn">
        <div @click="cancelModal">{{btn[1]}}</div>
        <div @click="confirmModal">{{btn[0]}}</div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      title: '',
      content: '',
      btn: ['确定', '取消']
    }
  },
  methods: {
    cancelModal () {
      this.visible = false
      const result = {
        confirm: false,
        cancel: true
      }
      this.$emit('modal', result)
    },
    confirmModal () {
      this.visible = false
      const result = {
        confirm: true,
        cancel: false
      }
      this.$emit('modal', result)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.container{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0,0,0,.3);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal{
    background:#fff;
    color:#333333;
    border-radius: .1rem;
    max-width:100%;
    min-width: 50%;
    box-sizing: border-box;
    color: #333;
    font-size: .32rem;
    .modal-title{
      width: 100%;
      height: .4rem;
      border-bottom: 1px solid #eee;
      line-height: .4rem;
      padding:.2rem;
      text-align: center;
    }
    .modal-content{
      padding: .2rem;
      text-align: center;
    }
    .modal-btn{
      width: 100%;
      border-top: 1px solid #eee;
      height: .8rem;
      line-height: .8rem;
      display: flex;
      div{
        width: 50%;
        height: 100%;
        min-width: 1.2rem;
        color: #488BF1;
        text-align: center;
        box-sizing: border-box;
        &:first-child{
          border-right: 1px solid #eee;
        }
      }
    }
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
