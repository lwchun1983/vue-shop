import LoadingCmp from './Loading'

const loading = {
  install (Vue) {
    const LoadingContructor = Vue.extend(LoadingCmp)
    const vm = new LoadingContructor()
    vm.$mount(document.createElement('div'))
    document.body.appendChild(vm.$el)

    Vue.prototype.$showLoading = function (mask = true) {
      vm.show = true
      vm.mask = mask
    }

    Vue.prototype.$hideLoading = function () {
      vm.show = false
      vm.mask = false
    }
  }
}
export default loading