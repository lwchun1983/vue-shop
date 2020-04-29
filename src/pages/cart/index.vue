<template>
<div class="page">
  <common-header title="购物车"></common-header>
  <div class="cart-list">
    <div v-for="item of cart" :key="item.id" :class="{'cart-delete': item.delete}" class="cart-item border-bottom" :data-goods-id="item.id" @touchstart="touchStart" @touchend="touchEnd">
      <input type="checkbox" class="checkbox" :checked="item.selected" @click="toggleSelect(item.id)">
      <img class="goods-img" :src="item.img" @click="toGoodsDetail(item.id)">
      <div class="goods-desc">
        <div class="goods-name">{{item.name}}</div>
        <div class="goods-price">
          <span>￥{{item.price}}</span>
          <div class="goods-number-wrapper">
            <span class="opra iconfont" :class="{disabled:item.buyNumber===1}" @click="reduceCart(item.id)">&#xe66e;</span>
            <span class="number">{{item.buyNumber}}</span>
            <span class="opra iconfont" @click="addCart(item.id)">&#xe602;</span>
          </div>
        </div>
      </div>
      <div class="delete" @click="deleteCart(item.id)">删除</div>
    </div>
  </div>
  <div class="cart-count border-top">
    <div>
      <input type="checkbox" class="checkbox" :checked="selectAll" @click="toggleSelectAll">
      全选
    </div>
    <div class="total">
      合计: <em>￥{{total.toFixed(2)}}</em>
    </div>
    <div class="submit" @click="submitCart">结算({{cartNum}})</div>
    </div>
  <common-footer></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import {Storage} from '@/utils/storage'
let touchStartX = 0, touchStartTime = 0
export default {
  components: {
    CommonHeader,
    CommonFooter
  },
  data () {
    return {
      cart: [],
      selectAll: false,
      total: 0,
      cartNum: 0
    }
  },
  mounted () {
    const cart = Storage.getItem('cart') || []
    if (cart.length > 0) {
      this.cart = cart.map(item => {
        if (!Reflect.has(item, 'delete')) {
          item.delete = false
        }
        return item
      })
    }
    this.countCart()
  },
  methods: {
    submitCart () {
      if (this.cartNum === 0) {
        this.$showToast({
          message: '至少选择一个商品'
        })
        return
      }
      this.$router.push('/order?loginRedirect=' + encodeURIComponent('/order'))
    },
    toGoodsDetail (goodsId) {
      this.$router.push(`/goods-detail/${goodsId}`)
    },
    countCart () {
      let selectAll = []
      let total = 0
      let cartNum = 0
      this.cart.forEach(item => {
        if (item.selected) {
          total += item.price * item.buyNumber
          cartNum++
          selectAll.push(true)
        }
      })
      this.selectAll = selectAll.length > 0 ? selectAll.length === this.cart.length : false
      this.total = total
      this.cartNum = cartNum
      Storage.setItem('cart', this.cart)
    },
    toggleSelectAll () {
      this.cart.forEach(item => {
        item.selected = !this.selectAll
      })
      this.countCart()
    },
    toggleSelect (goodsId) {
      const index = this.cart.findIndex(item => item.id === goodsId)
      this.cart[index].selected = !this.cart[index].selected
      this.countCart()
    },
    addCart (goodsId) {
      const index = this.cart.findIndex(item => item.id === goodsId)
      this.cart[index].buyNumber++
      this.countCart()
    },
    reduceCart (goodsId) {
      const index = this.cart.findIndex(item => item.id === goodsId)
      if (this.cart[index].buyNumber > 1) {
        this.cart[index].buyNumber--
        this.countCart()
      }
    },
    deleteCart (goodsId) {
      this.$showModal({
        content: '确定要删除吗',
        success: res => {
          const index = this.cart.findIndex(item => item.id === goodsId)
          if (res.confirm) {
            this.cart.splice(index, 1)
            this.countCart()
          }
          if (res.cancel) {
            this.cart[index].delete = false
          }
        }
      })
    },
    touchStart (event) {
      touchStartX = event.changedTouches[0].clientX
      touchStartTime = event.timeStamp
    },
    touchEnd (event) {
      const distance = event.changedTouches[0].clientX - touchStartX
      const time = event.timeStamp - touchStartTime
      const goodsId = parseInt(event.currentTarget.dataset.goodsId)
      const index = this.cart.findIndex(item => item.id === goodsId)
      if (distance < -100 && time < 500) { // 左滑 显示删除按钮
        this.cart.forEach((item, key) => {
          if (key !== index) {
            item.delete = false
          } else {
            item.delete = true
          }
        })
      }
      if (distance > 100 && time < 500) {
        this.cart[index].delete = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  margin-top: $header-h;
  padding-bottom: $footer-h+.9rem;
}
.cart-list{
  width: 100%;
}
.cart-item{
  width: 100%;
  height: 2.4rem;
  padding: .2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  transition: all .5s;
}
.cart-item.cart-delete{
  left: -1.6rem;
  transition: all .5s;
}
.delete{
  position: absolute;
  top: 0;
  right: -1.6rem;
  width: 1.6rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #cc0000;
  color: #fff;
  font-size: .32rem;
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
  height: .4rem;
  line-height: .4rem;
  margin-top: .7rem;
  display: flex;
  justify-content: space-between;
}
.goods-number-wrapper{
  width: 1.6rem;
  height: 100%;
  border-top: 1px solid #f5f5f5;
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
  display: flex;
  line-height: .4rem;
  text-align: center;
}
.goods-number-wrapper .opra{
  width: .5rem;
  height: 100%;
  border-left: 1px solid #f5f5f5;
  border-right: 1px solid #f5f5f5;
  box-sizing: border-box;
  font-size: .2rem;
  color: #999;
  font-weight: 400;
}
.goods-number-wrapper .opra.disabled{
  color: #f5f5f5;
}
.goods-number-wrapper .number{
  flex: 1;
  font-size: .3rem;
  color: #333;
}
.cart-count{
  width: 100%;
  height: .9rem;
  display: flex;
  padding-left: .2rem;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: $footer-h;
  background: #fff;
}
.submit{
  width: 2.2rem;
  height: 100%;
  background: #ff5e46;
  color: #fff;
  font-size: .32rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.total{
  flex: 1;
  margin: 0 .5rem;
  height: 100%;
  display: flex;
  align-items: center;
}
.total em{
  font-size: .32rem;
  color: #ff5e46;
  font-weight: 700;
}

.checkbox{
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: .3rem;
  height: .3rem;
  background: url(/images/checkbox.png) no-repeat;
  outline: none;
  background-size: contain;
}
.checkbox:checked{
  background: url(/images/checkbox@selected.png) no-repeat left bottom;
  background-size: contain;
}
</style>
