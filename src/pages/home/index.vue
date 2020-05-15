<template>
<div class="page" ref="page">
  <common-header></common-header>
  <search-bar></search-bar>
  <div class="home" ref="home">
    <div>
      <home-swiper :swiperList="swiperList"></home-swiper>
      <icon-nav :navList="navList"></icon-nav>
      <recommend :recommendList="recommendList"></recommend>
      <sales :salesList="salesList"></sales>
      <new-goods :newGoodsList="newGoodsList"></new-goods>
      <goods-list :goodsList="goodsList"></goods-list>
    </div>
  </div>
  <common-footer></common-footer>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import HomeSwiper from './Swiper'
import IconNav from './IconNav'
import Recommend from './Recommend'
import Sales from './Sales'
import NewGoods from './NewGoods'
import GoodsList from './GoodsList'
import { Storage } from '@/utils/storage'
export default {
  components: {
    CommonHeader,
    CommonFooter,
    SearchBar,
    HomeSwiper,
    IconNav,
    Recommend,
    Sales,
    NewGoods,
    GoodsList
  },
  data () {
    return {
      swiperList: [],
      navList: [],
      recommendList: [],
      salesList: [],
      newGoodsList: [],
      goodsList: [],
      page: 1, // 为你推荐的页码
      count: 8, // 为你推荐每次获取的数量
      totalPage: 0, // 为你推荐的总页数 
      bestScrollConfig: {
        pullDownRefresh: {
          threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
          stop: 0 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
        },
        pullUpLoad: {
          threshold: -20 // 在上拉到超过底部 20px 时，触发 pullingUp 事件
        },
        click: true,
        probeType: 3,
        startY: 0,
        scrollbar: false
      }
    }
  },
  mounted () {
    const footerHeight = document.querySelector('.footer-container').offsetHeight
    this.$refs.page.style.paddingBottom = footerHeight + 'px'
    this.scrollDistance = footerHeight
    this.loadData()
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    async loadData () {
      this.$showLoading()
      try{
        await this.getSwiper()
        await this.getIconNav()
        await this.getRecommend()
        await this.getSales()
        await this.getNewGoods()
        await this.getGoodsList()
      } catch (err) {
        console.log(err)
      } finally {
        this.$hideLoading()
      }
    },
    initScroll () {
      const bodyHeight = document.documentElement.offsetHeight
      const headerHeight = document.querySelector('.header').offsetHeight
      const searchHeight = document.querySelector('.search-container').offsetHeight
      const footerHeight = document.querySelector('.footer-container').offsetHeight
      const wrapperHeight = bodyHeight - headerHeight - searchHeight - footerHeight
      this.$refs.home.style.height = wrapperHeight +'px'
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.home, this.bestScrollConfig)
      } else {
        this.scroll.refresh() // 重新属性BScroll状态
      }
      this.scroll.on('pullingDown', () => {
        this.reLoadData()
      })
      this.scroll.on('pullingUp', () => {
        this.loadMore()
      })
    },
    async reLoadData () {
      Storage.deleteItem('swiper')
      Storage.deleteItem('navList')
      this.swiperList = []
      this.navList = []
      this.recommendList = []
      this.salesList = []
      this.newGoodsList = []
      this.goodsList = []
      this.page = 1
      this.totalPage = 0
      await this.loadData()
      this.refreshScroll()
    },
    async getSwiper () {
      const swiper = Storage.getItem('swiper')
      if (swiper) {
        this.swiperList = swiper
      } else {
        const res = await this.axios.get('api/swiper?type=1')
        const swiperList = res.map(item => item.img)
        this.swiperList = swiperList
        Storage.setItem('swiper', swiperList)
      }
    },
    async getIconNav () {
      const navList = Storage.getItem('navList')
      if (navList) {
        this.navList = navList
      } else {
        const navList = await this.axios.get('api/navigate?type=1')
        this.navList = navList
        Storage.setItem('navList', navList)
      }  
    },
    async getRecommend () {
      this.recommendList = await this.axios.get('api/goods/recommend?type=1')
    },
    async getSales () {
      this.salesList = await this.axios.get('api/goods/sales?type=1')
    },
    async getNewGoods () {
      this.newGoodsList = await this.axios.get('api/goods/new?type=1')
    },
    async getGoodsList () {
      const {goods, total} = await this.axios.get('api/goods_list?type=1',{
        params: {
          page: this.page,
          count: this.count
        }
      })
      this.goodsList = this.goodsList.concat(goods)
      if (this.page === 1) {
        this.totalPage = Math.ceil(total / this.count)
      }
    },
    async loadMore () {
      if (this.totalPage === 0 || this.totalPage <= this.page) {
        this.$showToast({
          message: '亲，已经到底了！'
        })
        return
      }
      this.page++
      this.$showLoading()
      await this.getGoodsList()
      this.$hideLoading()
      this.refreshScroll()
    },
    refreshScroll () {
      this.$nextTick(() => {
        this.scroll.finishPullDown()
        this.scroll.finishPullUp()
        // 重新计算元素高度
        this.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  background: $color-c;
  padding-top: $page-margin-top;
  box-sizing: border-box;
  .home{
    width: 100%;
    overflow: hidden;
  }
}
</style>
