<template>
  <div class="b_article_header">
    <div class="article_title">
      {{ articleTitle }}
    </div>
    <div class="article_exec">
      <img :src="authorInfo.imgUrl" alt="">
      <span>{{ authorInfo.username }}</span>
      <el-button type="danger" round plain size="mini">关注</el-button>
    </div>
  </div>
</template>

<script>
export default {
  // props: ['articleTitle', 'userInfo'],
  data() {
    return {

    }
  },
  computed: {
    articleTitle() {
      return this.$store.state.articleDetail.articleTitle
    },
    authorInfo() {
      return this.$store.state.articleDetail.authorInfo
    }
  },
  mounted() {
    console.log(this.articleTitle, 123)
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/header.scss';
</style>