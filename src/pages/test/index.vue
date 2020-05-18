<template>
<div class="page">
<el-button type="primary">主要按钮</el-button>
<el-radio  label="1">备选项</el-radio>
</div>
</template>

<script>
import {Button,Message,Radio} from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/scss/element-variables.scss";
export default {
  components: {
    elButton: Button,
    elRadio: Radio
  },
  mounted () {
    Message.warning('警告')
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/global";

.page{
  width: 100%;
}
</style>
