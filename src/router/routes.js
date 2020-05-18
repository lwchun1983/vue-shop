import Home from "../pages/home/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/test",
    name: "Test",
    component: () => import('../pages/test/index')
  },
  {
    path: "/category",
    name: "Category",
    component: () => import('../pages/category/index')
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import('../pages/cart/index')
  },
  {
    path: "/search",
    name: "Search",
    component: () => import('../pages/search/index')
  },
  {
    path: "/searchlist",
    name: "SearchList",
    component: () => import('../pages/search-list/index')
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
    component: () => import('../pages/goods-list/index')
  },
  {
    path: "/goods-error",
    name: "GoodsError",
    component: () => import('../pages/goods-notfound/index')
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../pages/login/index')
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('../pages/register/index')
  },
  {
    path: "/goods-detail",
    redirect: '/'
  },
  {
    path: "/coupon",
    name: "Coupon",
    component: () => import('../pages/coupon/index')
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
    component: () => import('../pages/goods-detail/index')
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
    component: () => import('../pages/order-detail/index')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../pages/order/index')
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
    component: () => import('../pages/user/index')
  },
  {
    path: '/user/info',
    name: 'UserInfo',
    component: () => import('../pages/user-info/index')
  },
  {
    path: '/user/sign',
    name: 'UserSign',
    component: () => import('../pages/user-sign/index')
  },
  {
    path: '/user/order',
    name: 'UserOrder',
    component: () => import('../pages/user-order/index')
  },
  {
    path: '/user/collect',
    name: 'UserCollect',
    component: () => import('../pages/user-collect/index')
  },
  {
    path: '/user/notice',
    name: 'UserNotice',
    component: () => import('../pages/user-notice/index')
  },
  {
    path: '/user/points',
    name: 'UserPoints',
    component: () => import('../pages/user-points/index')
  },
  {
    path: '/user/footprint',
    name: 'UserFootprint',
    component: () => import('../pages/user-footprint/index')
  },
  {
    path: '/user/address',
    name: 'UserAddress',
    component: () => import('../pages/user-address/index')
  },
  {
    path: '/order/address',
    name: 'OrderAddress',
    component: () => import('../pages/order-address/index')
  },
  {
    path: '/user/add-address',
    name: 'AddAddress',
    component: () => import('../pages/add-address/index')
  },
  {
    path: '/user/coupon',
    name: 'UserCoupon',
    component: () => import('../pages/user-coupon/index')
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
    component: () => import('../pages/order-pay/index')
  }
];
export {
  routes
}