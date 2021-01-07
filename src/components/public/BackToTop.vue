<template>
  <el-backtop :target="domId" :bottom="offset">
    <div class="back_to_top">
      UP
    </div>
  </el-backtop>
</template>

<script>
export default {
  props: ['domId', 'offset']
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/backToTop.scss';
</style>
