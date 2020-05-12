<template>
<div class="header-container">
  <span class="iconfont back" @click="goBack">&#xe6be;</span>
  <div class="input-bar">
    <input type="text" v-model.trim="keyword" placeholder="请输入关键词">
    <span class="iconfont clear" v-show="keyword !== ''" @click="keyword=''">&#xe62e;</span>
  </div>
  <span class="search-btn" @click="search()">搜索</span>
  <ul class="quik-search" v-show="keyword !== ''">
    <li class="quik-search-item" v-for="item of quikSearch" :key="item" @click="search(item)">{{item}}</li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    query: String
  },
  data () {
    return {
      keyword: '',
      quikSearch: []
    }
  },
  watch: {
    keyword () {
      this.getQuikSearch()
    },
    query (val) {
      if (val !== '') {
        this.keyword = val
      }
    }
  },
  methods: {
    goBack () {
      this.$router.replace('/')
    },
    getQuikSearch () {
      if (this.keyword === '') {
        this.quikSearch = []
        return
      }
      this.axios.get('shose/search/quick', {
        params: {
          keyword: this.keyword
        }
      }).then(res => {
        this.quikSearch = res.list
      })
    },
    search (keyword = null) {
      if (keyword == null) {
        keyword = this.keyword
      }
      this.$emit('search', keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.header-container{
  width: 100%;
  height: .88rem;
  padding: 0 .2rem;
  box-sizing: border-box;
  @include layout-flex;
  .back{
    width: .6rem;
    height: 100%;
    font-size: .4rem;
    @include layout-flex(row, flex-start);
  }
  .input-bar{
    width: 0;
    flex: 1;
    height: .6rem;
    border: 1px solid #f1f1f1;
    background: #f3f4f5;
    border-radius: .3rem;
    font-size: .24rem;
    input{
      display: block;
      float: left;
      width: 80%;
      height: 100%;
      border: none;
      border-radius: .3rem;
      text-indent: .2rem;
      background: transparent;
    }
    .clear{
      display: block;
      float: left;
      width: 20%;
      height: 100%;
      padding: .3rem;
      box-sizing: border-box;
      border-radius: .3rem;
      @include layout-flex(row, flex-end);
      font-weight: bold;
      font-size: .32rem;
      color: $color-a;
    }
  }
  .search-btn{
    width: .8rem;
    height: 100%;
    font-size: .24rem;
    @include layout-flex(row, flex-end);
  }
  .quik-search{
    width: 100%;
    height: 100%;
    background: #ffffff;
    position: fixed;
    left: 0;
    top: .88rem;
    padding: 0 .2rem;
    box-sizing: border-box;
    .quik-search-item{
      width: 100%;
      height: 1rem;
      @include layout-flex(row, flex-start);
      font-size: .24rem;
    }
  }
}
</style>
