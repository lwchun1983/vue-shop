import ToastCmp from './Toast'

const loading = {
  install (Vue) {
    const ToastContructor = Vue.extend(ToastCmp)
    const vm = new ToastContructor()
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)

    Vue.prototype.$showToast = function (message = '', mask = true, duration = 1500) {
      if (message !== '') {
        vm.visible = true
        vm.mask = mask
        vm.message = message
        setTimeout( () => {
          vm.visible = false
          vm.mask = false
          vm.message = ''
        }, duration)
      }
    }
  }
}
export default loading