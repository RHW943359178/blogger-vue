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
              <span>
                <i class="el-icon-time"></i>
                {{ dateReturn(articleInfo.createTime) }}
              </span>
              <span>
                <i class="el-icon-tickets"></i>
                字数 {{ contentLength }}
                </span>
              <span>
                <i class="el-icon-view"></i>
                阅读 {{ articleInfo.viewCount }}
              </span>
              <span>
                <i class="el-icon-chat-dot-round"></i>
                评论 {{ articleInfo.commentCount }}
              </span>
              <span v-show="articleInfo.updateTime">
                <i class="el-icon-time"></i>
                上次更新 {{ dateReturn(articleInfo.updateTime) }}
                </span>
            </div>
          </div>
        </div>
        <!-- <div class="content" id="articleInfo_content" v-highlight v-html="articleInfo.content"></div> -->
      <mavonEditor
          class="md"
        :value="articleInfo.content"
        :subfield="mavonEditorOption.subfield"
        :defaultOpen="mavonEditorOption.defaultOpen"
        :toolbarsFlag="mavonEditorOption.toolbarsFlag"
        :editable="mavonEditorOption.editable"
        :scrollStyle="mavonEditorOption.scrollStyle"></mavonEditor>
      </div>
      <div class="recommend">
        
      </div>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import ARTICLE_DETAIL from '../api/articleDetail'
import common from '../utils/common'
export default {
  components: {
    mavonEditor
  },
  data() {
    return {
      articleInfo: '',
      contentLength: 0,
      mavonEditorOption: {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域 
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
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
          this.contentLength = this.articleInfo.content.length
        }
      })
    },
    //  时间处理
    dateReturn(time) {
      if (time) {
        return common.timeToDate(time)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/articleDetail.scss';
  @import '../assets/css/public/markdownCommon.scss';
</style>