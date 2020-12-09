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
                创建时间 {{ dateReturn(articleInfo.createTime) }}
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
              <!-- <span v-show="articleInfo.updateTime">
                <i class="el-icon-time"></i>
                上次更新 {{ dateReturn(articleInfo.updateTime) }}
                </span> -->
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
        <div class="author">
          <div class="image">
            <img src="../assets/img/user_avatar.jpg" alt="">
          </div>
          <div class="info">
            <div class="username">{{ author.username }}</div>
            <div class="articleInfo">
              <span>文章数 {{ author.articleCount }}</span>
              <span>总字数 {{ author.fontCount }}</span>
            </div>
          </div>
          <div class="button">
            <el-button type="danger" plain round size="mini">关注</el-button>
          </div>
        </div>
        <div class="other_article">
          <div class="title">
            <span class="split_line"></span>
            <span>其他文章</span>
          </div>
          <div class="body">
            <div v-for="(item, index) in otherArticle" :key="index">
              <div></div>
              <div></div>
            </div>
          </div>

        </div>
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
        scrollStyle: true,
      },  
      author: { //  当前文章的作者信息
        // username: '', //  用户名
        // articleCount: '', //  文章数
        // fontCount: '' //  总字数
      },
      //  当前作者的其他文章
      otherArticle: [], 
    }
  },
  mounted() {
    console.log(this.$route.query.id, 123)
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
        articleId: this.$route.query.id
      }
      ARTICLE_DETAIL.getArticleById({params}).then(result => {
        if (result && result.code == 200) {
          this.articleInfo = result.data
          this.contentLength = this.articleInfo.content.length
          this.getAuthorByUserId(result.data.userId)
        }
      })
    },
    //  时间处理
    dateReturn(time) {
      if (time) {
        return common.timeToDate(time)
      }
    },
    //  获取用户信息
    getAuthorByUserId(userId) {
      if (!userId) {
        return
      }
      ARTICLE_DETAIL.getAuthorByUserId({userId: userId}).then(result => {
        if (result && result.code == 200) {
          this.author = result.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/articleDetail.scss';
  @import '../assets/css/public/markdownCommon.scss';
</style>