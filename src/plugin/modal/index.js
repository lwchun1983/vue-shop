import ModalCmp from './Modal'

const modal = {
  install (Vue) {
    const ModalContructor = Vue.extend(ModalCmp)
    const vm = new ModalContructor()
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)

    Vue.prototype.$showModal = function ({title = '', content = '', btn = ['确定', '取消'], success = null}) {
      if (title === '' && content === '') {
        return
      }
      vm.visible = true
      vm.title = title
      vm.content = content
      vm.btn = btn

      vm.$off('modal')
      vm.$on('modal', function (result) {
        success && success(result)
      })
    }
  }
}
export default modal