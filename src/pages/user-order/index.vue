<template>
<div class="page">
  <common-header title="我的订单" back="/user"></common-header>
  <div class="tab border-bottom">
    <div class="tab-wrapper">
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === -1}" @click="tabOrder(-1)">全部</span>
      </div>
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === 1}" @click="tabOrder(1)">待付款</span>
      </div>
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === 2}" @click="tabOrder(2)">待发货</span>
      </div>
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === 3}" @click="tabOrder(3)">待收货</span>
      </div>
      <div class="tab-cell">
        <span class="tab-text" :class="{active: status === 4}" @click="tabOrder(4)">已完成</span>
      </div>
    </div>
  </div>
  <div class="order-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="scrollDistance">
    <div class="order-item" v-for="item of orders" :key="item.id">
      <div class="order-header">
        <span>订单编号：{{item.order_no}}</span>
        <span class="order-status">{{item.status|getOrderStatusText}}</span>
      </div>
      <div class="goods-list">
        <div class="goods" v-for="val of item.goods" :key="val.goods_id">
          <img :src="val.goods_img" class="goods-img">
          <div class="goods-info">
            <div class="goods-title">
              <div class="goods-name">{{val.goods_name}}</div>
              <span>&times;{{val.count}}</span>
            </div>
            <div class="goods-price">￥{{val.goods_price}}</div>
          </div>
        </div>
      </div>
      <div class="show-order" @click="$router.push('/order-detail/' + item.id)">查看订单</div>
    </div>
  </div>
  <div class="empty-orders" v-if="orders.length === 0">
    没有查询到结果
  </div>
</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import CommonHeader from '@/components/Header'
import {Token} from '@/utils/token'
import {getOrderStatus} from '@/utils/function'
export default {
  directives: {infiniteScroll},
  components: {
    CommonHeader
  },
  filters: {
    getOrderStatusText (status) {
      return getOrderStatus(status)
    }
  },
  data () {
    return {
      status: -1,
      orders: [],
      page: 1, // 为你推荐的页码
      count: 8, // 为你推荐每次获取的数量
      totalPage: 0, // 为你推荐的总页数 
      busy: false,
      scrollDistance: 20,
    }
  },
  mounted () {
    this.status = parseInt(this.$route.query.status || -1)
  },
  methods: {
    tabOrder (status) {
      this.status = status
      this.orders = []
      this.page = 1
      this.totalPage = 0
      this.busy = false
    },
    async getUserOrders () {
      this.$showLoading()
      const token = Token.getToken()
      const {list, total} = await this.axios.get('api/user/order',{
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
      this.orders = this.orders.concat(list)
      console.log(this.orders)
      if (this.orders.length === 0) {
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
        await this.getUserOrders()
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
  margin-top: $header-h;
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
        width: 20%;
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
  .order-list{
    width: 100%;
    padding: .2rem;
    box-sizing: border-box;
    .order-item{
      width: 100%;
      min-height: 2.9rem;
      box-sizing: border-box;
      border: 1px solid #f1f1f1;
      border-radius: .1rem;
      margin-bottom: .2rem;
      box-sizing: border-box;
      padding: .2rem;
      position: relative;
      .show-order{
        position: absolute;
        right: .2rem;
        bottom: .2rem;
        width: 1.3rem;
        height: .5rem;
        background: $color-a;
        border-radius: .25rem;
        @include layout-flex;
        font-size: .22rem;
        color: #ffffff;
      }
      .order-header{
        width: 100%;
        height: .4rem;
        @include layout-flex(row, space-between);
        font-size: .28rem;
        color: $color-d;
        .order-status{
          color: $color-a;
        }
      }
      .goods-list{
        width: 100%;
        .goods{
          width: 100%;
          height: 2rem;
          margin-top: .2rem;
          @include layout-flex;
          .goods-img{
            width: 2rem;
            height: 2rem;
          }
          .goods-info{
            width: 0;
            flex: 1;
            height: 100%;
            padding: .2rem 0;
            box-sizing: border-box;
            margin-left: .2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .goods-title{
              font-size: .28rem;
              color: $color-d;
              @include layout-flex(row, space-between);
              .goods-name{
                font-weight: bold;
                width: 90%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
            .goods-price{
              font-size: .32rem;
              color: $color-a;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .empty-orders{
    width: 100%;
    height: 1rem;
    @include layout-flex;
    font-size: .3rem;
    color: $color-e;
  }
}
</style>
