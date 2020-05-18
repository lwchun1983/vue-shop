/*
 * @Descripttion: 
 * @Author: 278096437@qq.com 李万春
 */
import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueLazyload from 'vue-lazyload'
import AwesomePicker from 'vue-awesome-picker'

import App from "./App.vue"
import router from "./router"
import store from "./store"
import Loading from './plugin/loading'
import Modal from './plugin/modal'
import Toast from './plugin/toast'

axios.defaults.baseURL = '/api/';
axios.defaults.timeout = 10000
axios.defaults.headers.appkey = 'f68bSYqte0m6EibwhARrzTcYDPoV0FobCi06uDfM3eF4QGQQKSywmd71ytM'

// 响应拦截
axios.interceptors.response.use(function (response) {
  const res = response.data
  if (res.error_code === 0) {
    return res.data || ''
  } else {
    return Promise.reject(new Error(res.error_msg || '获取失败'))
  }
}, function (error) {
  console.log('error', error)
  return Promise.reject(error)
})
Vue.use(VueAxios, axios)

Vue.use(AwesomePicker)
// 图片懒加载
Vue.use(VueLazyload, {
  loading: '/images/loading-svg/loading-bars.svg'
})

Vue.use(Loading)
Vue.use(Modal)
Vue.use(Toast)
Vue.config.productionTip = false;
// Vue.prototype.$message = Message

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
