<template>
<div>
  <search-header :query="keyword" @search="search"></search-header>
  <div class="search-history" v-if="history.length > 0">
    <div class="menu">
      <span>最近搜索</span>
      <a href="javascript:" @click="clearHistory">清空</a>
    </div>
    <div class="history-list">
      <div class="history-item" v-for="item of history" :key="item" @click="search(item)">
        {{item}}
      </div>
    </div>
  </div>
  <div class="search-history" v-if="hotSearch.length > 0">
    <div class="menu">
      <span>热门搜索</span>
    </div>
    <div class="history-list">
      <div class="history-item" :class="{active: index < 3}" v-for="(item, index) of hotSearch" :key="item" @click="search(item)">
        {{item}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SearchHistory from '@/utils/searchHistory'
import SearchHeader from './Header'
export default {
  components: {
    SearchHeader
  },
  data () {
    return {
      history: [],
      hotSearch: [],
      keyword: ''
    }
  },
  mounted () {
    this.keyword = this.$route.query.q || ''
    this.history = SearchHistory.getHistory()
    this.getHotSearch()
  },
  methods: {
    clearHistory () {
      SearchHistory.clearHistory()
      this.history = []
    },
    async getHotSearch () {
      this.hotSearch = await this.axios.get('shose/search/hot').then(res => res.list)
    },
    search (keyword = null) {
      if (keyword === '') {
        return
      }
      SearchHistory.setHistory(keyword)
      this.$router.push('/searchlist?q=' + keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.search-history{
  width: 100%;
  padding: 0 .2rem;
  box-sizing: border-box;
  margin-top: .2rem;
  .menu{
    width: 100%;
    height: .6rem;
    @include layout-flex(row, space-between);
    font-size: .24rem;
    a{
      color: $color-e;
    }
  }
  .history-list{
    width: 100%;
    margin-top: .2rem;
    @include layout-flex(row, flex-start);
    flex-wrap: wrap;
    .history-item{
      color: #5d78ab;
      font-size: .24rem;
      padding: 0 .2rem;
      line-height: .56rem;
      height: .56rem;
      max-height: .56rem;
      margin: .13333rem .13333rem .16rem 0;
      max-width: 100%;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      border: 1px solid #5d78ab;
      border-radius: .06rem;
      &.active{
        color: #e4007f;
        border-color: #f7add6;
      }
    }
  }
}
</style>
