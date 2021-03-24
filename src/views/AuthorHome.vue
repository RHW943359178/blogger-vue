<template>
  <div class="author_home">
    <div class="author_box">
      <div class="left">
        <div class="header">
          <div class="icon">
            <img :src="'/static/' + authorInfo.imgUrl" alt="">
          </div>
          <div class="author">
            <div class="author_name">
              {{ authorInfo.username }}
            </div>
            <div class="authorInfo">
              <div class="info_box">
                <div>{{ authorInfo.followLength }}</div>
                <div>关注</div>
              </div>
              <div class="info_box">
                <div>7</div>
                <div>粉丝</div>
              </div>
              <div class="info_box">
                <div>{{ authorInfo.articleCount }}</div>
                <div>文章</div>
              </div>
              <div class="info_box">
                <div>{{ authorInfo.fontCount }}</div>
                <div>字数</div>
              </div>
              <div class="info_box">
                <div>8</div>
                <div>收获喜欢</div>
              </div>
            </div>
          </div>
          <div class="buttonBox">
            <div v-if="!authorIsSelf()">
              <el-button type="success" plain round @click="sendMessage">发博客信</el-button>
              <el-button icon="el-icon-plus" type="success" round>关注</el-button>
            </div>
          </div>
        </div>
        <div class="body">
          <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
            <el-tab-pane name="article" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
              <span slot="label"><i class="el-icon-tickets"></i>发表文章</span>
              <div class="article_box" v-for="item in articleList" :key="item.id">
                <a :href="'#/blogger/article?id=' + item.id" target="_blank">{{ item.title }}</a>
                <p>{{ item.summary }}</p>
                <div>
                  <span>
                    <i class="el-icon-view"></i>
                    {{ item.viewCount }}
                  </span>
                  <span>
                    <i class="el-icon-chat-line-square"></i>
                    {{ item.commentCount }}
                  </span>
                  <span>
                    <i class="el-icon-time"></i>
                    {{ dateReturn(item.createTime) }}
                  </span>
                  <span></span>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="动态" name="dynamic">
              <span slot="label"><i class="el-icon-edit"></i>最新动态</span>
            </el-tab-pane>
            <el-tab-pane label="关注" name="follow">
              <span slot="label"><i class="el-icon-paperclip"></i>他的关注</span>
              <div class="follow_box" v-for="(item, index) in userFollowUser" :key="index">
                <div class="follow_left">
                  <img src="../assets/img/user_avatar.jpg" alt="">
                </div>
                <div class="follow_middle">
                  <div class="name">RHW可以的</div>
                  <div class="info">
                    <span>关注 0</span>
                    <span>粉丝 160</span>
                    <span>文章 5</span>
                  </div>
                  <div class="info">写了 4516 字，获得了 413 个喜欢</div>
                </div>
                <div class="follow_right" v-if="!authorIsSelf()">
                  <el-button type="success" round class="el-icon-plus">关注</el-button>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="粉丝" name="fans">
              <span slot="label"><i class="el-icon-star-on"></i>他的粉丝</span>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="right">

      </div>
    </div>
    <!-- 聊天信息框 -->
    <Chat :visible="chatVisible" :username="authorInfo.username" />
  </div>
</template>

<script>
import MY from '../api/my'
import ARTICLE_DETAIL from '../api/articleDetail'
import AUTHOR_HOME from '../api/authorHome'
import common from '../utils/common'
import Chat from '../components/Chat'
export default {
  components: {
    Chat
  },
  data () {
    return {
      activeName: 'article',
      pagination: {
        pageSize: 10,
        pageNum: 1
      },
      authorInfo: {},
      //  文章列表
      articleList: [],
      // 缓存的列表（用于接收数据）
      cacheList: [],
      //  用户的关注列表
      userFollowUser: [],
      //  用户聊天信息框
      chatVisible: false
    }
  },
  mounted () {
    this.getUserInfo()
  },
  computed: {
    author () {
      return this.$route.query
    }
  },
  methods: {
    //  切换tab页
    handleClick (val) {
      switch (val) {
        case 'article':
          break
        case 'dynamic':
          break
        case 'follow':
          this.getFollowUserInfo()
          break
        case 'fans':
          break
      }
    },
    //  获取发表文章列表
    getArticleList () {
      if (!this.author.userId) {
        this.$message({ type: 'error', message: '无法获取该作者信息', showClose: true })
        return
      }
      const params = {
        userId: this.author.userId,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.pageNum
      }
      MY.getArticleList({ params }).then(result => {
        if (result && result.code == 200) {
          this.cacheList = result.data
        }
      }).then(() => {
        //  将每次请求来的数据 concat 到文章列表里
        this.articleList = this.articleList.concat(this.cacheList)
      })
    },

    //  无限加载请求文章列表
    load () {
      //  element中无限下拉加载的方法 load，默认第一次加载页面就会触发
      this.getArticleList()
      this.pagination.pageNum += 1
    },
    //  时间处理
    dateReturn (time) {
      if (time) {
        return common.timeToDate(time)
      }
    },
    //  获取用户信息
    getUserInfo () {
      if (!this.author.userId) {
        return
      }
      const params = {
        userId: this.author.userId
      }
      ARTICLE_DETAIL.getAuthorByUserId(params).then(result => {
        if (result && result.code == 200) {
          this.authorInfo = result.data
          if (!this.authorInfo.follow) {
            this.authorInfo.followLength = this.authorInfo.follow.split('').length
          } else {
            this.authorInfo.followLength = this.authorInfo.follow.split(',').length
          }
        }
      })
    },
    //  批量获取用户关注人信息
    getFollowUserInfo () {
      if (!this.author.follow) {
        return
      }
      //  将关注字符串转为数组
      const arr = this.author.follow.split(',')
      const params = {
        followList: arr
      }
      AUTHOR_HOME.getUserFollowList(params).then(result => {
        if (result && result.code == 200) {
          this.userFollowUser = result.data
        }
      })
    },
    //  判断当前文章作者是不是自己
    authorIsSelf () {
      const self = localStorage.getItem('userId')
      if (self === this.author.userId) {
        return true
      } else {
        return false
      }
    },
    //  点击发博客信
    sendMessage () {
      this.chatVisible = true
    },
    //  关闭聊天dialog框
    closeDialog () {
      this.chatVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/authorHome.scss';
</style>
