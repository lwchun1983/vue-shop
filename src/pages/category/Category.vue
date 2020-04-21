<template>
<ul class="category-container">
  <li v-for="item of content" :key="item.cat_id" :class="{active: item.cat_id === catId}" class="category-item" @click="changeCategory(item.cat_id)">
    <div class="category-name">{{item.cat_name}}</div>
  </li>
</ul>
</template>

<script>
export default {
  props: {
    content: Array,
  },
  watch:{
    content (newList) {
      this.catId = newList.length > 0 ? newList[0].cat_id : 0
    }
  },
  data () {
    return {
      catId: 0
    }
  },
  methods: {
    changeCategory (catId) {
      this.catId = catId
      this.$emit('change', catId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";
.category-container{
  width: 100%;
  height: 100%;
  .category-item{
    width: 100%;
    height: .9rem;
    padding: .2rem;
    padding-right: 0;
    box-sizing: border-box;
    color: $color-d;
    font-size: .32rem;
    .category-name{
      width: 100%;
      height: 100%;
      @include layout-flex; 
      border-left: .06rem solid transparent;
      box-sizing: border-box;
    }
    &.active{
      background: #ffffff;
      .category-name{
        border-left: .06rem solid $color-a;
        box-sizing: border-box;
      }
    }
  }
}
</style>
