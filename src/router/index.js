import Vue from "vue";
import VueRouter from "vue-router";
import {Token} from "../utils/token"
import config from './config'
import {routes} from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active",
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
});

// 登录验证
router.beforeEach((to, from, next) => {
  if (Array.isArray(config.authRoute) && config.authRoute.includes(to.name)) {
    const token = Token.getToken()
    if (token === '') {
      let url
      if (to.query.loginRedirect) {
        url = decodeURIComponent(to.query.loginRedirect)
      } else {
        url = encodeURIComponent(to.fullPath)
      }
      next(`/login?url=${url}`)
    } else {
      next()
    }
  } else{
    next()
  }
})

export default router;
