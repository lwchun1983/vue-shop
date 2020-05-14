<template>
<div class="page">
  <common-header title="我的收藏" back="/user"></common-header>
  <div class="goods-list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="scrollDistance">
    <div class="goods-item" v-for="item of list" :key="item.goods_id">
      <img class="goods-img" :src="item.goods_img">
      <div class="goods-desc">
        <div class="goods-name">{{item.goods_name}}</div>
        <div class="goods-price">
          ￥{{item.goods_price|formatPrice}}
        </div>
      </div>
      <div class="goods-oper">
        <div class="show-goods" @click="$router.push(`/goods-detail/${item.goods_id}`)">去看看</div>
        <div class="cancel" @click="cancelCollect(item.goods_id)">取消收藏</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import infiniteScroll from 'vue-infinite-scroll'
import CommonHeader from '@/components/Header'
import {Token} from "@/utils/token"
import {filters} from '@/utils/mixins'
export default {
  directives: {infiniteScroll},
  mixins: [filters],
  components: {
    CommonHeader
  },
  data () {
    return {
      list: [],
      page: 1, // 为你推荐的页码
      count: 8, // 为你推荐每次获取的数量
      totalPage: 0, // 为你推荐的总页数 
      busy: false,
      scrollDistance: 20,
    }
  },
  methods: {
    async getUserCollect () {
      this.$showLoading()
      const token = Token.getToken()
      const {list, total} = await this.axios.get('shose/user/getCollect',{
        params: {
          page: this.page,
          count: this.count
        },
        headers: {
          token
        }
      })
      this.$hideLoading()
      this.list = this.list.concat(list)
      console.log(this.list)
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
    },
    cancelCollect (goodsId) {
      this.$showModal({
        content: '确定要取消收藏吗？',
        success: res => {
          if (res.confirm) {
            const token = Token.getToken()
            this.$showLoading()
            this.axios.post('shose/collect/cancel', {goods_id: goodsId}, {
              headers: {
                token
              }
            }).then(() => {
              this.$showToast({
                message: '操作成功',
                callback: () => {
                  const index = this.list.findIndex(item => item.goods_id === goodsId)
                  this.list.splice(index, 1)
                }
              })
            }).catch(err => {
              this.$showToast({
                message: err.message
              })
            }).finally(() => {
              this.$hideLoading()
            })
          }
        }
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
  padding-top: $header-h;
  box-sizing: border-box;
  background: #ffffff;
  .goods-list{
    width: 100%;
    padding: 0 .2rem;
    box-sizing: border-box;
  }
  .goods-item{
    width: 100%;
    height: 2.2rem;
    padding: .2rem 0;
    @include layout-flex;
    box-sizing: border-box;
    border: 1px solid #f1f1f1;
    border-radius: .1rem;
    margin-top: .2rem;
    position: relative;
    .goods-oper{
      position: absolute;
      right: .2rem;
      bottom: .2rem;
      @include layout-flex(column);
      .show-goods{
        width: 1.4rem;
        height: .5rem;
        @include layout-flex;
        border-radius: .25rem;
        background: $color-a;
        color: #ffffff;
        font-size: .24rem;
      }
      .cancel{
        width: 1.4rem;
        height: .5rem;
        @include layout-flex;
        color: $color-e;
        font-size: .24rem;
      }
    }
  }
  .goods-img{
    width: 2rem;
    height: 2rem;
    border-radius: .1rem;
    margin-left: .2rem;
  }
  .goods-desc{
    flex: 1;
    width: 0;
    padding: .2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }
  .goods-name{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: .32rem;
    font-weight: 700;
    color: #333;
  }
  .goods-price{
    width: 100%;
    font-size: .36rem;
    font-weight: 700;
    color: #ff5e46;
    line-height: .4rem;
    margin-top: .7rem;
  }

}
</style>
