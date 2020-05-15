<template>
<div class="page">
  <common-header title="我的积分" back="/user"></common-header>
  <div class="tab border-bottom">
    <div class="tab-wrapper">
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === -1}" @click="tabChange(-1)">全部</span>
      </div>
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === 1}" @click="tabChange(1)">收入</span>
      </div>
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === 2}" @click="tabChange(2)">支出</span>
      </div>
    </div>
  </div>
  <div class="notice-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="scrollDistance">
    <div class="notice" v-for="item of list" :key="item.id">
      <div class="notice-time">{{item.add_time|dateFmt}}</div>
      <div class="notice-body">
        <div class="notice-title">{{item.type===1?'+':'-'}}{{item.points}}积分</div>
        <div class="notice-content">{{item.content}}</div>
      </div>
    </div>
  </div>
  <div class="empty-list" v-if="list.length === 0">
    没有查询到结果
  </div>
</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import CommonHeader from '@/components/Header'
import {Token} from "@/utils/token"
import {filters} from '@/utils/mixins'
import {dateFormat} from '@/utils/function'
export default {
  directives: {infiniteScroll},
  mixins: [filters],
  components: {
    CommonHeader
  },
  filters: {
    dateFmt (time) {
      return dateFormat('YYYY年m月d日', new Date(time * 1000))
    }
  },
  data () {
    return {
      status: -1,
      list: [],
      page: 1, // 为你推荐的页码
      count: 8, // 为你推荐每次获取的数量
      totalPage: 0, // 为你推荐的总页数 
      busy: false,
      scrollDistance: 20,
    }
  },
  methods: {
    tabChange (status) {
      this.status = status
      this.list = []
      this.page = 1
      this.totalPage = 0
      this.busy = false
    },
    async getUserCollect () {
      this.$showLoading()
      const token = Token.getToken()
      const {list, total} = await this.axios.get('shose/user/points',{
        params: {
          page: this.page,
          count: this.count,
          type: this.status
        },
        headers: {
          token
        }
      })
      this.$hideLoading()
      this.list = this.list.concat(list)
      if (this.list.length === 0) {
        this.totalPage = -1
      } else {
        if (this.page === 1) {
          this.totalPage = Math.ceil(total / this.count)
        }
        this.page++
      } 
    },
    async loadMore () {
      this.busy = true
      if (this.page <= this.totalPage || this.totalPage === 0) {
        await this.getUserCollect()
        this.busy = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  height: 100%;
  padding-top: $header-h;
  box-sizing: border-box;
  background: #ffffff;
  .tab{
    width: 100%;
    height: .8rem;
    background: #ffffff;
    .tab-wrapper{
      width: 100%;
      height: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      @include layout-flex;
      .tab-cell{
        width: 33.33%;
        height: 100%;
        @include layout-flex;
        .tab-text{
          height: 100%;
          font-size: .32rem;
          color: $color-b;
          @include layout-flex;
          border-bottom: 2px solid #ffffff;
          box-sizing: border-box;
          &.active{
            border-bottom: 2px solid $color-a;
          }
        }
      }
    }
  }
  .notice-list{
    width: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
    .notice{
      width: 100%;
      margin-top: .3rem;
      .notice-time{
        width: 100%;
        height: .4rem;
        font-size: .32rem;
        @include layout-flex;
        color: $color-d;
      }
      .notice-body{
        width: 100%;
        padding: .2rem;
        box-sizing: border-box;
        background: $color-c;
        color: $color-d;
        border-radius: .1rem;
        margin-top: .2rem;
        .notice-title{
          width: 100%;
          height: .4rem;
          font-size: .28rem;
        }
        .notice-content{
          width: 100%;
          font-size: .24rem;
          line-height: 1.4em;
        }
      }
    }
  }
  .empty-list{
    width: 100%;
    height: 1rem;
    @include layout-flex;
    font-size: .3rem;
    color: $color-e;
  }
}
</style>
