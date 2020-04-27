import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index";
import Category from "../pages/category/index";
import GoodsList from "../pages/goods-list/index"
import GoodsDetail from "../pages/goods-detail/index";
import GoodsError from "../pages/goods-notfound/index";
import Cart from "../pages/cart/index";
import Login from "../pages/login/index";
import Register from "../pages/register/index";
import Coupon from "../pages/coupon/index";
import {Token} from "../utils/token"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/category",
    name: "Category",
    component: Category
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  },
  {
    path: "/goods-list",
    name: "GoodsList",
    props: route => {
      let cid = route.query.cid || 0
      const cname = route.query.cname || ""
      if (isNaN(cid)) {
        cid = 0
      }
      return {
        cid: parseInt(cid),
        cname
      }
    },
    component: GoodsList,
  },
  {
    path: "/goods-error",
    name: "GoodsError",
    component: GoodsError
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/goods-detail",
    redirect: '/'
  },
  {
    path: "/coupon",
    name: "Coupon",
    component: Coupon
  },
  {
    path: "/goods-detail/:id",
    beforeEnter (to, from, next) {
      const id = to.params.id
      if (!/^\d+$/.test(id)) {
        next(from.path)
      } else {
        next()
      }
    },
    props: route => {
      return {
        id: parseInt(route.params.id)
      }
    },
    name: "GoodsDetail",
    component: GoodsDetail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active"
});

// 需要做登录验证的路由名称
const AUTH_ROUTER_NAME = ['Coupon']
// 登录验证
router.beforeEach((to, from, next) => {
  if (AUTH_ROUTER_NAME.includes(to.name)) {
    const token = Token.getToken()
    if (token === '') {
      const url = encodeURIComponent(from.path)
      next(`/login?url=${url}`)
    } else {
      next()
    }
  } else{
    next()
  }
})

export default router;
