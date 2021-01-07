<template>
  <div class="b_recommend">
    <div class="title">
      <span class="split_line"></span>
      <span>{{ title }}</span>
      <el-button v-if="buttonFlag" style="position: absolute; right: 20px;" type="text" icon="el-icon-refresh">{{ buttonContent }}</el-button>
    </div>
    <div class="body">
      <div class="each_article" v-for="(item, index) in recommandArticle" :key="index">
        <div class="other_title">
          <a :href="'#/blogger/article?id=' + item.id" target="_blank">{{ item.title }}</a>
        </div>
        <div class="read">
          <span>阅读数</span>
          <span>{{ item.viewCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'buttonFlag', 'buttonContent', 'recommandArticle']
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/recommend.scss';
</style>