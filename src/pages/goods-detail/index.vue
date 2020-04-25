<template>
<div>
  <detail-header :showIconMenu="showIconMenu" :opacity="headerOpacity" :scrollTab="scrollTab" @tab="changeTab"></detail-header>
  <div class="page" ref="page">
    <div>
      <div id="goods">
        <detail-gallery :gallery="gallery"></detail-gallery>
      </div>
      <detail-info :goods="goods"></detail-info>
      <div id="comment">
        <detail-comment :goodsId="id" :list="comment.list" :count="comment.count"></detail-comment>
      </div>
      <div id="detail">
        <div class="title">
          <div class="cell">
            <hr>
          </div>
          <span>详情</span>
          <div class="cell">
            <hr>
          </div>
        </div>
        <div class="img" v-for="(item,index) of goods.content" :key="index">
          <img v-lazy="item">
        </div>
      </div>
    </div>
  </div>
  <div class="footer border-top">
    <div class="footer-left">
      <div class="footer-cell" @click="$router.push('/')">
        <span class="iconfont">&#xe603;</span>
        首页
      </div>
      <div class="footer-cell">
        <span class="iconfont">&#xe699;</span>
        客服
      </div>
      <div class="footer-cell" :class="{collect: isCollect}" @click="collect">
        <span class="iconfont">{{isCollect?'&#xe604;':'&#xe680;'}}</span>
        {{isCollect?'已收藏':'收藏'}}
      </div>
    </div>
    <div class="footer-right">
      <div class="buy">立即购买</div>
      <div class="cart">加入购物车</div>
    </div>
  </div>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import DetailHeader from "./Header"
import DetailGallery from "./Gallery"
import DetailInfo from "./Info"
import DetailComment from "./Comment"
import {Token} from '@/utils/token'
export default {
  props: {
    id: Number
  },
  components: {
    DetailHeader,
    DetailGallery,
    DetailInfo,
    DetailComment
  },
  data () {
    return {
      isCollect: false,
      scrollTab: 'goods',
      showIconMenu: true,
      headerOpacity: 0,
      comment: {},
      gallery: [],
      goods: {},
      scroll: null,
      scrollOptions: {
        startY: 0,
        click: true,
        scrollX: false,
        scrollY: true,
        // 当 probeType 为 1 的时候，会非实时（屏幕滑动超过一定时间后）派发scroll 事件；当 probeType 为 2 的时候，会在屏幕滑动的过程中实时的派发 scroll 事件；当 probeType 为 3 的时候，不仅在屏幕滑动的过程中，而且在 momentum 滚动动画运行过程中实时派发 scroll 事件。如果没有设置该值，其默认值为 0，即不派发 scroll 事件。
        probeType: 3,
        scrollbar: false
      }
    }
  },
  mounted () {
    this.getGoods()
    this.initScroll()
    this.initCollect()
  },
  methods: {
    async initCollect () {
      // 判断是否登录
      const token = Token.getToken()
      if (token === '') {
        this.isCollect = false
        return
      }
      this.axios.get('shose/collect/check', {
        params: {
          goods_id: this.id
        },
        headers: {
          token
        }
      }).then(res => {
        this.isCollect = res.collect === 1
      })
    },
    async collect () {
      // 判断是否登录
      const token = Token.getToken()
      if (token === '') { // 没有登录，则跳转至登录页面
        const url = encodeURIComponent('/goods-detail/' + this.id)
        this.$router.push(`/login?url=${url}`)
        return
      }
      // 已经登录，判断是收藏还是取消收藏
      let path = ''
      if (this.isCollect) {
        path = 'shose/collect/cancel'
      } else {
        path = 'shose/collect/confirm'
      }
      this.$showLoading()
      await this.axios.post(path, {goods_id: this.id}, {
        headers: {
          token
        }
      })
      this.$hideLoading()
      this.isCollect = !this.isCollect
    },
    changeTab (tabName) {
      this.scrollTab = tabName
      this.scroll.scrollToElement('#'+tabName, 1000, 0, -50)
    },
    initScroll () {
      this.$nextTick( () => {
        let bodyHeight = document.documentElement.offsetHeight
        let footerHeight = document.querySelector('.footer').offsetHeight
        this.$refs.page.style.height = bodyHeight - footerHeight + 'px'
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.page, this.scrollOptions)
        } else {
          this.scroll.refresh() // 重新属性BScroll状态
        }
        this.scroll.on('scroll', position => {
          const y = Math.abs(position.y)
          const headerOpacity = y / 150
          this.headerOpacity = headerOpacity > 1 ? 1 : headerOpacity
          if (y > 50) {
            this.showIconMenu = false
          } else {
            this.showIconMenu = true
          }
        })
      })
    },
    getGoods () {
      this.axios.get(`api/goods?goods_id=${this.id}`).then(result => {
        console.log(result)
        const {comment: commentList, commentTotal, gallery, goods} = result
        this.comment = {
          list: commentList,
          count: commentTotal
        }
        this.gallery = gallery
        this.goods = goods
      }).catch(err => {
        console.log(err)
        this.$router.replace('/goods-error')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  background: $color-c;
  overflow: hidden;
  .title{
    height: 1rem;
    padding: 0 30%;
    line-height: 1rem;
    display: flex;
    align-items: center;
    color: #666;
    .cell{
      width: 0;
      flex: 1;
    }
    span{
      padding: 0 .2rem;
    }
  }
  .img{
    width: 100%;
    height: auto;
    img{
      width: 100%;
    }
  }
}
.footer{
  width: 100%;
  height: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ffffff;
  @include layout-flex;
  .footer-left{
    width: 0;
    flex: 1;
    height: 100%;
    @include layout-flex;
    color: $color-e;
    .footer-cell{
      width: 33.33%;
      @include layout-flex(column);
      font-size: .24rem;
      .iconfont{
        font-size: .3rem;
        margin-bottom: .1rem;
      }
      &.collect{
        color: #FF0036;
      }
    }
  }
  .footer-right{
    width: 4.5rem;
    height: 100%;
    @include layout-flex;
    background: $color-a;
    .buy,.cart{
      width: 50%;
      height: 100%;
      color: #ffffff;
      @include layout-flex;
      font-size: .3rem;
    }
    .buy{
      background: #FF0036;
    }
  }
}
</style>
