<template>
  <div class="b_article_detail">
    <div class="detail_box">
      <div class="article">
        <div class="title">{{ articleInfo.title }}</div>
        <div class="introduce" @click="jumpToAuthorHome">
          <div class="icon">
            <img src="../assets/img/user_avatar.jpg"  alt="">
          </div>
          <div class="info">
            <div class="name">{{ articleInfo.username }}</div>
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
            <el-button v-if="!followFlag && !authorIsSelf()" :loading="followLoading"  type="danger" icon="" plain round size="mini" @click="authorFollow(1)">关注</el-button>
            <el-button v-if="followFlag" :loading="followLoading" type="success" plain round size="mini" @click="authorFollow(2)">取消关注</el-button>
          </div>
        </div>
        <div class="other_article" v-show="otherArticle.length">
          <div class="title">
            <span class="split_line"></span>
            <span>其他文章</span>
          </div>
          <div class="body">
            <div class="each_article" v-for="(item, index) in otherArticle" :key="index">
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
        <div class="recommend_read other_article">
          <div class="title">
            <span class="split_line"></span>
            <span>推荐阅读</span>
            <el-button style="position: absolute; right: 20px;" type="text" icon="el-icon-refresh">换一批</el-button>
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
        imgUrl: '',
        userId: '',
        username: '', //  用户名
        articleCount: '', //  文章数
        fontCount: '' //  总字数
      },
      //  当前作者的其他文章
      otherArticle: [], 
      //  推荐文章
      recommandArticle: [],
      //  其他文章页码信息
      otherPage: {
        pageNum: 1,
        pageSize: 5,
      },
      //  推荐文章条数 0 < x <= 10
      recommendRange: 5,
      //  文章篇数
      articleCount: 0,
      //  文章总字数
      fontCount: 0,
      //  是否已经关注
      followFlag: false,
      //  关注按钮loading
      followLoading: false
    }
  },
  mounted() {
    this.getArticleInfo()
    // this.getSelfInfo()
  },
  computed: {
    articleId() {
      return this.$store.state.home.articleId
    },
    //  用户的文章信息（文章篇数和总字数）
    userArticle() { 
      return this.$store.state.user.userArticle
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
          this.getOtherArticle(result.data.userId, this.$route.query.id)
          this.getRecommendArticle(result.data.categoryId)
          this.getArticleFontCount(result.data.userId)
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
          this.author.userId = result.data.userId
          this.author.imgUrl = result.data.imgUrl
          this.author.username = result.data.username
          this.getSelfInfo()
        }
      })
    },
    //  获取其他文章列表
    getOtherArticle(userId, articleId) {
      if (!userId) {
        return
      }
      let params = {
        userId: userId,
        articleId: parseInt(articleId),
        pageSize: this.otherPage.pageSize,
        pageNum: this.otherPage.pageNum
      }
      //  获取其他文章列表，同时排除当前文章
      ARTICLE_DETAIL.getOtherArticle(params).then(result => {
        if (result && result.code == 200) {
          this.otherArticle = result.data
        }
      })
    },
    //  获取推荐阅读文章列表
    getRecommendArticle(categoryId) {
      if (!categoryId) {
        return
      }
      let params = {
        categoryId: categoryId,
        num: this.recommendRange
      }
      ARTICLE_DETAIL.getRecommendArticle({params}).then(result => {
        if (result && result.code == 200) {
          this.recommandArticle = result.data
        }
      })
    },
    //  获取用户总文章篇数和总字数
    getArticleFontCount(userId) {
      if (!userId) {
        return
      }
      let params = {
        userId: userId
      }
      ARTICLE_DETAIL.getArticleFontCount({params}).then(result => {
        if (result && result.code == 200) {
          //  提交数据到 vuex
          // this.$store.commit('updateUserArticle', result.data)
          this.author.articleCount = result.data.articleCount
          this.author.fontCount = result.data.fontCount
        }
      })
    },
    //  跳转到作者主页
    jumpToAuthorHome() {
      if (!this.articleInfo.userId) {
        return
      }
      this.$router.push({
        path: `/blogger/authorHome`,
        query: {author: this.author}
      })
    },
    //  判断当前文章作者是不是自己
    authorIsSelf() {
      let self = localStorage.getItem('userId')
      if (self === this.author.userId) {
        return true
      } else {
        return false
      }
    },
    //  判断用户 follow 字段中是否包含 文章的 用户id
    followFlagExist(follow) {
      if (follow) {
        let arr = follow.split(',')
        // console.log(arr.indexOf(this.articleInfo.userId), 123)
        if (arr.indexOf(this.articleInfo.userId) != -1) {
          this.followFlag = true
          // console.log(this.followFlag, 'this.followFlag')
        } else {
          this.followFlag = false
        }
      } else {
        this.followFlag = false
      }
    },
    //  这里需要请求自己当前登录用户的信息，要来同步 关注信息
    getSelfInfo() {
      if (!localStorage.getItem('userId')) {
        return
      }
      var follow = ''
      ARTICLE_DETAIL.getAuthorByUserId({userId: localStorage.getItem('userId')}).then(result => {
        if (result && result.code == 200) {
          follow = result.data.follow
          this.followFlagExist(follow)
        }
      })
    },
    //  作者关注操作
    authorFollow(val) {
      if (this.followLoading) {
        return
      }
      //  本地判断用户是否登录
      if (!localStorage.getItem('flag') && !localStorage.getItem('username') && !localStorage.getItem('userId')) {
        //  跳转到登录页
        this.$message({type: 'warning', message: '请先登录...'})
        this.$router.push({
          path: '/blogger/signUp'
        })
        return
      }
      //  判断用户的用户id是否合法
      let params = {
        execType: val,
        followId: this.author.userId
      }
      console.log(params, 123)
      if (val === 2) {  //  1 为关注 2 为取消关注
        this.$confirm('确定取消关注吗？', '确定', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.updateFollow(params)
        }).catch(() => {})
      } else {
        this.updateFollow(params)
      }
    },
    //  后台关注与取消关注接口
    updateFollow(params) {
      this.followLoading = true
      ARTICLE_DETAIL.updateUserFollow(params).then(result => {
        if (result && result.code == 200) {
          this.followLoading = false
          // this.getAuthorByUserId()
          this.getSelfInfo()
          this.$message({type: 'success', message: result.message})
        } else if (result && result.code == 401) {
          //  防止session过期或者从浏览器端修改 localstorage 配置
          this.$message({type: 'warning', message: '请先登录...'})
          this.$router.push({
            path: '/blogger/signUp'
          })
        } else {
          this.followLoading = false
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/articleDetail.scss';
  @import '../assets/css/public/markdownCommon.scss';
</style>