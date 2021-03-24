<template>
  <div class="b_article_detail" ref="b_article_detail" @scroll="handleScroll">
    <div class="detail_box">
      <div class="article_box">
      <div class="article">
        <!-- <div class="title">{{ articleInfo.title }}</div> -->
        <div class="introduce" @click="jumpToAuthorHome">
          <div class="icon">
            <img :src="author.imgUrl"  alt="">
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
            </div>
          </div>
        </div>
        <mavonEditor
          class="md"
          id="mavon_editor"
          :value="articleInfo.content"
          :subfield="mavonEditorOption.subfield"
          :defaultOpen="mavonEditorOption.defaultOpen"
          :toolbarsFlag="mavonEditorOption.toolbarsFlag"
          :editable="mavonEditorOption.editable"
          :scrollStyle="mavonEditorOption.scrollStyle">
        </mavonEditor>
        <MarkdownNav ref="markdown_nav" :scrollTop="scrollTop" :rootId="'mavon_editor'" />
      </div>
        <div class="comment_list_body">
          <CommentBox :type="1"  :id="0"/>
          <div class="comment_list">
            <div class="comment_list_exec">
              <div class="exec_show">
                <span>全部评论</span>
                <span>{{ commentCountSum }}</span>
                <el-button type="text">只看作者</el-button>
              </div>
              <div class="exec_button">
                <el-button type="text">按时间正序</el-button>
                <el-button type="text">按时间倒叙</el-button>
              </div>
            </div>
            <div class="comment_list_show" v-for="(item, index) in commentList" :key="item.id">
              <img :src="'/static/' + item.imgUrl" alt="">
              <div class="comment_list_info">
                <div class="main_comment">
                  <div>
                    <span>{{ item.username }}</span>
                    <span v-if="authorIsSelf(item.userId)">作者</span>
                  </div>
                  <div>
                    <span>{{ item.id }}楼</span>
                    <span>{{ dateReturn(item.createTime) }}</span>
                  </div>
                  <div>
                    {{ item.commentContent }}
                  </div>
                  <div>
                    <span :class="{'is_star': isStar(item.starLinkUser)}" @click="handleStarExec(item.id, item.starLinkUser)">
                      <i class="el-icon-star-on"></i>
                      <span v-if="item.stars ">{{ item.stars }}</span>
                      <span v-else>赞</span>
                    </span>
                    <span @click="commentBoxShow(index)">
                      <i class="el-icon-chat-line-square"></i>
                      回复
                    </span>
                  </div>
                </div>
                <div class="comment_list_show comment_list_show_follow" v-for="it in item.followComment" :key="it.id">
                  <img :src="'/static/' + it.imgUrl" alt="">
                  <div class="comment_list_info comment_list_info_follow">
                    <div class="main_comment">
                      <div>
                        <span>{{ it.username }}</span>
                        <span v-if="authorIsSelf(it.userId)">作者</span>
                      </div>
                      <div>
                        <!-- <span>{{ it.id }}楼</span> -->
                        <span>{{ dateReturn(it.createTime) }}</span>
                      </div>
                      <div>
                        {{ it.commentContent }}
                      </div>
                      <div>
                        <span :class="{'is_star': isStar(it.starLinkUser)}" @click="handleStarExec(it.id, it.starLinkUser)">
                          <i class="el-icon-star-on"></i>
                          <span v-if="it.stars ">{{ it.stars }}</span>
                          <span v-else>赞</span>
                        </span>
                        <span @click="commentBoxShow(index)">
                          <i class="el-icon-chat-line-square"></i>
                          回复
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="new_comment" @click="commentBoxShow(index)">
                  <i class="el-icon-edit"></i>
                  <span>添加新评论</span>
                </div>
                <CommentBox ref="childComment" :type="2" :id="item.id" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="recommend">
        <div class="author">
          <div class="image">
            <img :src="author.imgUrl" alt="">
          </div>
          <div class="info">
            <div class="username">{{ author.username }}</div>
            <div class="articleInfo">
              <span>文章数 {{ author.articleCount }}</span>
              <span>总字数 {{ author.fontCount }}</span>
            </div>
          </div>
          <div class="button">
            <el-button v-if="!followFlag && !authorIsSelf(author.userId)" :loading="followLoading"  type="danger" icon="" plain round size="mini" @click="authorFollow(1)">关注</el-button>
            <el-button v-if="followFlag" :loading="followLoading" type="success" plain round size="mini" @click="authorFollow(2)">取消关注</el-button>
          </div>
        </div>
        <div class="other_article" v-show="otherArticle.length">
          <Recommend :title="'其他文章'" :buttonFlag="false" :recommandArticle="otherArticle" />
        </div>
        <div class="recommend_read other_article" v-show="recommandArticle.length">
          <Recommend :title="'推荐阅读'" :buttonFlag="true" :buttonContent="'换一批'" :recommandArticle="recommandArticle" />
        </div>
      </div>
    </div>
    <div :class="['comment_box', {'comment_box_focus': focusFlag}]">
      <div class="comment">
        <div :class="['comment_input', {'comment_input_focus': focusFlag}]">
          <textarea :class="{'textarea_focus': focusFlag}" v-model.trim="commentContent" @focus="conmentFocus" placeholder="写下你的评论..." size="small" ></textarea>
        </div>
        <div class="comment_count" v-show="!focusFlag">
          <i class="el-icon-chat-line-square"></i>
          <span>评论 {{ commentCountSum }}</span>
        </div>
        <div class="comment_yes" v-show="!focusFlag">
          <i class="el-icon-star-off"></i>
          <span>赞 {{ commentStarsSum }}</span>
        </div>
        <div class="publish" v-show="focusFlag">
          <el-button type="danger" :disabled="!commentContent" :loading="commentLoading" plain size="mini" @click="commentPublish(1, commentContent, 0)">发布</el-button>
          <el-button type="info" plain size="mini" @click="conmentBlur">取消</el-button>
        </div>
      </div>
    </div>
    <BackToTop :domId="'.b_article_detail'" :offset="60" />
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import ARTICLE_DETAIL from '../api/articleDetail'
import common from '../utils/common'
import CommentBox from '../components/public/CommentBox'
import MarkdownNav from '../components/MarkdownNav'
import Recommend from '../components/public/Recommend'
import BackToTop from '../components/public/BackToTop'
export default {
  components: {
    mavonEditor,
    CommentBox,
    MarkdownNav,
    Recommend,
    BackToTop
  },
  data () {
    return {
      articleInfo: '',
      contentLength: 0,
      mavonEditorOption: {
        subfield: false, // 单双栏模式
        defaultOpen: 'preview', // edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
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
        pageSize: 5
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
      followLoading: false,
      //  评论保存按钮 loading
      commentLoading: false,
      //  评论内容
      commentContent: '',
      //  非固定页面的评论内容
      commentContentT: '',
      //  评论列表
      commentList: [],
      //  评论框是否聚焦
      focusFlag: false,
      //  评论页码
      commentPage: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      //  评论的类型 1 主评论 2 回帖评论
      commentType: 1,
      //  标记当前的评论 index
      currentCommnet: 0,
      //  文章当前的评论总数
      commentCountSum: 0,
      //  文章当前的点赞总数
      commentStarsSum: 0,
      //  点赞操作类型  1 点赞 2 取消点赞
      starExecType: 1,
      rootContent: [],
      scrollTop: ''

    }
  },
  mounted () {
    this.getArticleInfo()
    // this.getSelfInfo()
  },
  computed: {
    articleId () {
      return this.$store.state.home.articleId
    },
    //  用户的文章信息（文章篇数和总字数）
    userArticle () {
      return this.$store.state.user.userArticle
    }
  },
  methods: {
    handleScroll () {
      // 根据滚动右侧内容定位到左侧菜单
      if (this.$refs.b_article_detail) {
        this.scrollTop = this.$refs.b_article_detail.scrollTop
        //  这里定义一个值，用于滚轮滚动时的临界值，控制显示隐藏
        if (this.scrollTop <= 160) {
          this.$store.commit('updateScrollFlag', false)
        } else {
          this.$store.commit('updateScrollFlag', true)
        }
      }
    },
    //  获取文章具体信息
    getArticleInfo () {
      const params = {
        articleId: this.$route.query.id
      }
      ARTICLE_DETAIL.getArticleById({ params }).then(result => {
        if (result && result.code == 200) {
          this.articleInfo = result.data
          this.contentLength = this.articleInfo.content.length
          this.getAuthorByUserId(result.data.userId)
          this.getOtherArticle(result.data.userId, this.$route.query.id)
          this.getRecommendArticle(result.data.categoryId)
          this.getArticleFontCount(result.data.userId)
          this.getCommentList(this.$route.query.id)
          //  将文章标题存入 vuex
          this.$store.commit('updateArticleInfo', this.articleInfo.title)
          // this.$store.commit('updateAuthorInfo', this.articleInfo.title)
        }
      }).then(() => {
        //  调用子类方法获取元素
        this.$refs.markdown_nav.handleGetAllLabel('markdown_nav')
      })
    },
    //  时间处理
    dateReturn (time) {
      if (time) {
        return common.timeToDate(time)
      }
    },
    //  获取用户信息
    getAuthorByUserId (userId) {
      if (!userId) {
        return
      }
      ARTICLE_DETAIL.getAuthorByUserId({ userId: userId }).then(result => {
        if (result && result.code == 200) {
          // this.author.userId = result.data.userId
          // this.author.imgUrl = result.data.imgUrl
          // this.author.username = result.data.username
          this.author = result.data
          if (result.data.imgUrl) {
            this.author.imgUrl = '/static/' + result.data.imgUrl
          }
          this.getSelfInfo()
          //  将文章作者信息存入 vuex
          this.$store.commit('updateAuthorInfo', this.author)
        }
      })
    },
    //  获取其他文章列表
    getOtherArticle (userId, articleId) {
      if (!userId) {
        return
      }
      const params = {
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
    getRecommendArticle (categoryId) {
      if (!categoryId) {
        return
      }
      const params = {
        categoryId: categoryId,
        num: this.recommendRange
      }
      ARTICLE_DETAIL.getRecommendArticle({ params }).then(result => {
        if (result && result.code == 200) {
          this.recommandArticle = result.data
        }
      })
    },
    //  获取用户总文章篇数和总字数
    getArticleFontCount (userId) {
      if (!userId) {
        return
      }
      const params = {
        userId: userId
      }
      ARTICLE_DETAIL.getArticleFontCount({ params }).then(result => {
        if (result && result.code == 200) {
          //  提交数据到 vuex
          // this.$store.commit('updateUserArticle', result.data)
          this.author.articleCount = result.data.articleCount
          this.author.fontCount = result.data.fontCount
        }
      })
    },
    //  跳转到作者主页
    jumpToAuthorHome () {
      if (!this.articleInfo.userId) {
        return
      }
      const detail = this.$router.resolve({
        path: '/blogger/authorHome',
        query: {
          userId: this.author.userId,
          follow: this.author.follow
        }
      })
      window.open(detail.href, '_blank')
      // this.$store.commit('updateArticleId', item.id)

      // this.$router.push({
      //   path: `/blogger/authorHome`,
      //   query: {author: this.author}
      // })
    },
    //  判断当前文章作者是不是自己
    authorIsSelf (param) {
      const self = localStorage.getItem('userId')
      if (self === param) {
        return true
      } else {
        return false
      }
    },
    //  判断用户 follow 字段中是否包含 文章的 用户id
    followFlagExist (follow) {
      if (follow) {
        const arr = follow.split(',')
        if (arr.indexOf(this.articleInfo.userId) != -1) {
          this.followFlag = true
        } else {
          this.followFlag = false
        }
      } else {
        this.followFlag = false
      }
    },
    //  这里需要请求自己当前登录用户的信息，要来同步 关注信息
    getSelfInfo () {
      if (!localStorage.getItem('userId')) {
        return
      }
      var follow = ''
      ARTICLE_DETAIL.getAuthorByUserId({ userId: localStorage.getItem('userId') }).then(result => {
        if (result && result.code == 200) {
          follow = result.data.follow
          this.followFlagExist(follow)
        }
      })
    },
    //  作者关注操作
    authorFollow (val) {
      if (this.followLoading) {
        return
      }
      //  本地判断用户是否登录
      if (!localStorage.getItem('flag') && !localStorage.getItem('username') && !localStorage.getItem('userId')) {
        //  跳转到登录页
        this.$message({ type: 'warning', message: '请先登录...' })
        this.$router.push({
          path: '/blogger/signUp'
        })
        return
      }
      //  判断用户的用户id是否合法
      const params = {
        execType: val,
        followId: this.author.userId
      }
      if (val === 2) { //  1 为关注 2 为取消关注
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
    updateFollow (params) {
      this.followLoading = true
      ARTICLE_DETAIL.updateUserFollow(params).then(result => {
        if (result && result.code == 200) {
          this.followLoading = false
          // this.getAuthorByUserId()
          this.getSelfInfo()
          this.$message({ type: 'success', message: result.message })
        } else if (result && result.code == 401) {
          //  防止session过期或者从浏览器端修改 localstorage 配置
          this.$message({ type: 'warning', message: '请先登录...' })
          this.$router.push({
            path: '/blogger/signUp'
          })
        } else {
          this.followLoading = false
        }
      })
    },
    //  评论 input 框聚焦
    conmentFocus () {
      this.focusFlag = true
    },
    //  评论 input 框失焦
    conmentBlur () {
      this.focusFlag = false
      this.commentContent = ''
    },
    //  调用子元素的 focus 方法
    commentBoxShow (index) {
      this.currentCommnet = index
      if (this.$refs.childComment.length) {
        this.$refs.childComment[index].conmentFocusT()
      }
    },
    // conmentFocusT() {
    //   this.focusFlagT = true
    // },
    // //  非固定评论框 失焦
    // conmentBlurT() {
    //   this.focusFlagT = false
    // },
    //  评论保存
    commentPublish (val, content, buildId) {
      if (!localStorage.getItem('flag') && !localStorage.getItem('username') && !localStorage.getItem('userId')) {
        //  跳转到登录页
        this.$message({ type: 'warning', message: '请先登录...' })
        this.$router.push({
          path: '/blogger/signUp'
        })
        return
      }
      const params = {
        userId: localStorage.getItem('userId'),
        articleId: this.articleInfo.id,
        commentContent: content,
        buildId: buildId,
        commentType: val
      }
      ARTICLE_DETAIL.commentSave(params).then(result => {
        if (result && result.code == 200) {
          this.$message({ type: 'success', message: '评论成功！' })
          this.commentLoading = false
          this.commentContent = ''
          //  关闭编辑状态
          // this.focusFlag = false
          this.getCommentList(this.$route.query.id)
          //  关闭评论框
          if (this.currentCommnet) {
            this.$refs.childComment[this.currentCommnet].conmentBlurT()
          }
        }
      })
    },
    //  获取评论列表
    getCommentList (articleId) {
      const params = {
        articleId: articleId,
        pageSize: this.commentPage.pageSize,
        pageNum: this.commentPage.pageNum
      }
      ARTICLE_DETAIL.getCommentList({ params }).then(result => {
        if (result && result.code == 200) {
          this.commentList = result.data.commentList
          this.commentStarsSum = result.data.starsCount
          this.commentCountSum = result.data.commentCount
        }
      })
    },
    //  用户点赞或者取消点赞操作
    handleStarExec (id, starLinkUser) {
      if (!localStorage.getItem('flag') && !localStorage.getItem('username') && !localStorage.getItem('userId')) {
        //  跳转到登录页
        this.$message({ type: 'warning', message: '请先登录...' })
        this.$router.push({
          path: '/blogger/signUp'
        })
        return
      }
      let execType = 1
      //  根据 starLinkUser 字段中是否包含当前用户的id，来判断当前操作的操作类型
      if (starLinkUser.indexOf(localStorage.getItem('userId')) === -1) {
        execType = 1
      } else {
        execType = 2
      }
      const params = {
        commentId: id,
        execType: execType
      }
      ARTICLE_DETAIL.starAndCancelStar(params).then(result => {
        if (result && result.code == 200) {
          this.getCommentList(this.$route.query.id)
        }
      })
    },
    //  是否已经点赞过
    isStar (starLinkUser) {
      if (starLinkUser.indexOf(localStorage.getItem('userId')) > -1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/css/articleDetail.scss';
  @import '../assets/css/public/markdownCommon.scss';
</style>
