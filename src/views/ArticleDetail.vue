<template>
  <div class="b_article_detail">
    <div class="detail_box">
      <div class="article">
        <div class="title">{{ articleInfo.title }}</div>
        <div class="introduce">
          <div class="icon">
            <img src="../assets/img/user_avatar.jpg"  alt="">
          </div>
          <div class="info">
            <div class="name">RHW</div>
            <div class="write_info">
              <span>2020.11.25 15:16:36</span>
              <span>字数 {{ contentLength }}</span>
              <span>阅读 {{ articleInfo.viewCout }}</span>
              <span>评论 {{ articleInfo.commentCout }}</span>
              <span v-show="articleInfo.updateTime">上次更新 {{ articleInfo.updateTime }}</span>
            </div>
          </div>
        </div>
        <div class="content" id="articleInfo_content" v-highlight v-html="articleInfo.content"></div>
      </div>
      <div class="recommend"></div>
    </div>
  </div>
</template>

<script>
import ARTICLE_DETAIL from '../api/articleDetail'
import marked from 'marked'
export default {
  data() {
    return {
      articleInfo: '',
      contentLength: 0
    }
  },
  mounted() {
    this.getArticleInfo()
  },
  computed: {
    articleId() {
      return this.$store.state.home.articleId
    }
  },
  methods: {
    //  获取文章具体信息
    getArticleInfo() {
      let params = {
        articleId: this.articleId
      }
      ARTICLE_DETAIL.getArticleById({params}).then(result => {
        if (result && result.code == 200) {
          this.articleInfo = result.data
          //  使用marked插件将markdown语法渲染成html语法
          this.articleInfo.content = marked(this.articleInfo.content)
          this.contentLength = this.articleInfo.content.length
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/articleDetail.scss';
</style>