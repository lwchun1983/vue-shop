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
import Order from "../pages/order/index";
import Search from "../pages/search/index";
import SearchList from "../pages/search-list/index";
import User from "../pages/user/index";
import UserAddress from "../pages/user-address/index";
import UserInfo from "../pages/user-info/index";
import UserSign from "../pages/user-sign/index";
import UserOrder from "../pages/user-order/index";
import UserCoupon from "../pages/user-coupon/index";
import UserFootprint from "../pages/user-footprint/index";
import AddAddress from "../pages/add-address/index";
import OrderAddress from "../pages/order-address/index";
import OrderDetail from "../pages/order-detail/index";
import OrderPay from "../pages/order-pay/index";
import {Token} from "../utils/token"
import config from './config'

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
    path: "/search",
    name: "Search",
    component: Search
  },
  {
    path: "/searchlist",
    name: "SearchList",
    component: SearchList
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
  },
  {
    path: "/order-detail/:id",
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
    name: "OrderDetail",
    component: OrderDetail
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  // {
  //   path: '/user',
  //   name: 'User',
  //   component: User,
  //   children: [
  //     {
  //       path: 'address',
  //       name: 'UserAddress',
  //       component: UserAddress
  //     },
  //     {
  //       path: 'add-address',
  //       name: 'AddAddress',
  //       component: AddAddress
  //     }
  //   ]
  // },
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/user/info',
    name: 'UserInfo',
    component: UserInfo,
  },
  {
    path: '/user/sign',
    name: 'UserSign',
    component: UserSign,
  },
  {
    path: '/user/order',
    name: 'UserOrder',
    component: UserOrder
  },
  {
    path: '/user/footprint',
    name: 'UserFootprint',
    component: UserFootprint
  },
  {
    path: '/user/address',
    name: 'UserAddress',
    component: UserAddress
  },
  {
    path: '/order/address',
    name: 'OrderAddress',
    component: OrderAddress
  },
  {
    path: '/user/add-address',
    name: 'AddAddress',
    component: AddAddress
  },
  {
    path: '/user/coupon',
    name: 'UserCoupon',
    component: UserCoupon
  },
  {
    path: '/order/pay',
    beforeEnter (to, from, next) {
      const id = to.query.id
      if (!/^\d+$/.test(id)) {
        next('/')
      } else {
        next()
      }
    },
    name: 'OrderPay',
    component: OrderPay
  }
];

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
        url = encodeURIComponent(to.path)
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
