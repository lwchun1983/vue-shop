<template>
<div class="page">
  <common-header title="分类" :back="backUrl"></common-header>
  <search-bar></search-bar>
  <div class="content">
    <div class="content-left">
      <category :content="category" @change="loadSubCategory"></category>
    </div>
    <div class="content-right">
      <sub-category :content="subCategory"></sub-category>
    </div>
  </div>
  <common-footer></common-footer>
</div>
</template>

<script>
import CommonHeader from '@/components/Header'
import CommonFooter from '@/components/Footer'
import SearchBar from '@/components/SearchBar'
import Category from './Category'
import SubCategory from './SubCategory'
export default {
  components: {
    CommonHeader,
    CommonFooter,
    SearchBar,
    Category,
    SubCategory
  },
  data () {
    return {
      backUrl: '',
      category: [],
      subCategory: [],
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.backUrl = from.path
    })
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    // 获取一级分类
    async getCategory () {
      this.$showLoading()
      const category = await this.axios.get('api/goods_category?type=1')
      this.$hideLoading()
      if (category.length > 0) {
        this.category = category
        this.getSubCategory(category[0].cat_id)
      }
    },
    // 获取二级分类
    async getSubCategory (catId) {
      this.$showLoading()
      this.subCategory = await this.axios.get('api/goods_category?type=1&cat_id=' + catId)
      this.$hideLoading()
    },
    loadSubCategory (catId) {
      this.getSubCategory(catId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.page{
  width: 100%;
  min-height: 100%;
  margin-top: $page-margin-top;
}
.content{
  width: 100%;
  height: 100%;
  @include layout-flex;
  .content-left{
    width: 2rem;
    height: 100%;
    background-color: $color-c;
  }
  .content-right{
    width: 0;
    flex: 1;
  }
}
</style>
