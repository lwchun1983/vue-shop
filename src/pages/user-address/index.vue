<template>
<div class="page">
  <common-header title="我的地址" back="/user"></common-header>
  <div class="address-list">
    <div class="address-item" v-for="item of address" :key="item.id">
      <div class="address-info">
        <div class="address-content">
          <div class="address-name">
            <span>{{item.name}}</span>
            <span class="phone">{{item.phone}}</span>
          </div>
          <div class="address-detail">
            {{item.province}} {{item.city}} {{item.area}} {{item.address}}
          </div>
        </div>
      </div>
      <div class="address-opera border-top">
        <div class="default-address">
          <input type="checkbox" class="checkbox" :checked="item.is_default === 1" @click="setDefaultAddress(item.id, item.is_default)">
          默认地址
        </div>
        <div class="edit-address">
          <span class="iconfont" @click="$router.push(`/user/add-address?id=${item.id}&t=1`)">&#xe636; 编辑</span>
          <span class="iconfont" @click="deleteAddress(item.id)">&#xe613; 删除</span>
        </div>
      </div>
    </div>
  </div>
  <div class="add-address" v-if="showAddAddress" @click="$router.push(`/user/add-address?t=1`)">添加新地址</div>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import {Token} from "@/utils/token"
import {Storage} from "@/utils/storage"
const MAX_ADDRESS_NUM = 10

export default {
  components: {
    CommonHeader
  },
  data () {
    return {
      address: [],
      showAddAddress: true,
    }
  },
  mounted () {
    this.getUserAddress()
  },
  methods: {
    async getUserAddress () {
      const USER_TOKEN = Token.getToken()
      this.address = await this.axios.get('shose/address', {
        headers: {
          token:USER_TOKEN
        }
      }).then(res => res.address)
      console.log(this.address)
      this.showAddAddress = (MAX_ADDRESS_NUM - this.address.length) > 0
    },
    setDefaultAddress (addressId, isDefault) {
      if (isDefault === 1) {
        return
      }
      this.$showLoading()
      const USER_TOKEN = Token.getToken()
      this.axios.post('shose/address/default', 
        {
          id: addressId,
          is_default: 1
        }, 
        {
         headers: {
          token:USER_TOKEN
        }
      }).then(()=>{
        this.address.forEach(item => {
          if (item.id === addressId) {
            item.is_default = 1
          } else {
            item.is_default = 0
          }
        })
        this.$showToast({
          message: '设置成功'
        })
      }).catch(err => {
        this.$showToast({
          message: err.message
        })
      }).finally(() => this.$hideLoading())
    },
    deleteAddress (addressId) {
      this.$showModal({
        content: '确定要删除吗？',
        success: res => {
          if (res.confirm) {
            this.$showLoading()
            const token = Token.getToken()
            this.axios.post('shose/address/delete', {id: addressId}, {
              headers: {
                token
              }
            }).then(() => {
              this.$showToast({
                message: '删除成功'
              })
              const index = this.address.findIndex(item => item.id === addressId)
              this.address.splice(index, 1)
              const address = Storage.getItem('address') || {}
              if (Object.keys(address).length > 0 && parseInt(address.id) === addressId) {
                Storage.deleteItem('address')
              }
            }).catch(err => {
              this.$showToast({
                message: err.message
              })
            }).finally(() => this.$hideLoading())
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
  padding: $header-h 0 .9rem;
  box-sizing: border-box;
  background: #ffffff;
  .address-list{
    width: 100%;
    background: $color-c;
    padding-bottom: .2rem;
    .address-item{
      width: 100%;
      max-height: 2.14rem;
      background: #ffffff;
      margin-bottom: .2rem;
      &:last-child{
        margin-bottom: 0;
      }
      .address-info{
        width: 100%;
        max-height: 1.4rem;
        overflow: hidden;
        .address-content{
          width: 100%;
          height: 100%;
          padding: .2rem .4rem;
          box-sizing: border-box;
          color: $color-d;
          font-size: .28rem;
          .address-name{
            width: 100%;
            height: .5rem;
            @include layout-flex(row, space-between);
            .phone{
              font-weight: bold;
            }
          }
          .address-detail{
            width: 100%;
            line-height: .4rem;
          }
        }
      }
      .address-opera{
        width: 100%;
        height: .74rem;
        @include layout-flex(row, space-between);
        font-size: .28rem;
        .default-address{
          margin-left: .4rem;
          color: $color-a;
        }
        .edit-address{
          margin-right: .4rem;
          color: $color-d;
          .iconfont{
            margin-left: .2rem;
          }
        }
      }
    }
  }
  .add-address{
    width: 100%;
    height: .9rem;
    background: $color-a;
    color:#ffffff;
    font-size: .36rem;
    @include layout-flex;
    position: fixed;
    left: 0;
    bottom: 0;
  }
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
