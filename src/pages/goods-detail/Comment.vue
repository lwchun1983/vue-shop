<template>
  <div class="container">
    <div class="title border-bottom">
      <span>商品评价({{count}})</span>
      <router-link tag="p" :to="'/goods-comment/' + goodsId" class="more" v-if="showMore">查看全部<span class="iconfont">&#xe637;</span></router-link>
    </div>
    <ul class="list">
      <li v-for="item of list" :key="item.id">
        <h1 class="title">
          <span>{{item.username}}</span>
          <span>{{item.add_time|dateFormat}}</span>
        </h1>
        <div class="content">{{item.content}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import {dateFormat} from '@/utils/function'
export default{
  name: 'Name',
  props: {
    list: Array,
    count: Number,
    goodsId: Number
  },
  filters: {
    dateFormat (time) {
      return dateFormat('YYYY-mm-dd HH:MM', new Date(time * 1000))
    }
  },
  computed: {
    showMore () {
      if (!this.list) {
        return false
      }
      return !!this.list.length
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 100%;
  height: auto;
  padding: 0 .2rem;
  box-sizing: border-box;
  background: #fff;
  margin-top: .2rem;
  .title{
    width: 100%;
    height: .88rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .28rem;
    color: #666;
    .more{
      font-size: .26rem;
      color: #FF0036;
      span{
        font-weight: 600;
        margin-left: .1rem;
      }
    }
  }
  .list{
    padding-bottom: .2rem;
  }
  .content{
    line-height: .4rem;
    color: #333;
  }
}
</style>
