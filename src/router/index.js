import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/home/index";
import Category from "../pages/category/index";

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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: 'active'
});

export default router;
