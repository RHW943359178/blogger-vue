<template>
  <div class="author_home">
    <div class="author_box">
      <div class="left">
        <div class="header">
          <div class="icon">
            <img src="../assets/img/user_avatar.jpg" alt="">
          </div>
          <div class="author">
            <div class="author_name">
              {{  }}
            </div>
            <div class="authorInfo">
              <div class="info_box">
                <div>8</div>
                <div>关注</div>
              </div>
              <div class="info_box">
                <div>7</div>
                <div>粉丝</div>
              </div>
              <div class="info_box">
                <!-- <div>{{ userArticle.fontCount }}</div> -->
                <div>文章</div>
              </div>
              <div class="info_box">
                <!-- <div>{{ userArticle.articleCount }}</div> -->
                <div>字数</div>
              </div>
              <div class="info_box">
                <div>8</div>
                <div>收获喜欢</div>
              </div>
            </div>
          </div>
          <div>
            <el-button type="success" plain round>发博客信</el-button>
            <el-button icon="el-icon-plus" type="success" round>关注</el-button>
          </div>
        </div>
        <div class="body">
          <el-tabs v-model="activeName" @tab-click="handleClick">
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
  </div>
</template>

<script>
import MY from '../api/my'
import ARTICLE_DETAIL from '../api/articleDetail'
import common from '../utils/common'
export default {
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
      cacheList: []
    }
  },
  mounted() {
    // this.getArticleList()
    this.getUserInfo()
  },
  computed: {
    author() {
      return this.$route.query.author
    }
  },
  methods: {
    //  切换tab页
    handleClick(val) {
      switch (val) {
        case 'article':
          break
        case 'dynamic':
          break
        case 'follow':
          break
        case 'fans':
          break
      }
    },
    //  获取发表文章列表
    getArticleList() {
      if (!this.author.userId) {
        this.$message({type: 'error', message: '无法获取该作者信息', showClose: true})
        return
      }
      let params = {
        userId: this.author.userId,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.pageNum
      }
      MY.getArticleList({params}).then(result => {
        if (result && result.code == 200) {
          this.cacheList = result.data
        }
      }).then(() => {
        //  将每次请求来的数据 concat 到文章列表里
          this.articleList = this.articleList.concat(this.cacheList)
      })
    },

    //  无限加载请求文章列表
    load() {
      //  element中无限下拉加载的方法 load，默认第一次加载页面就会触发
      this.getArticleList()
      this.pagination.pageNum += 1
    },
    //  时间处理
    dateReturn(time) {
      if (time) {
        return common.timeToDate(time)
      }
    },
    //  获取用户信息
    getUserInfo() {
            console.log(this.author.userId, 123224)
      if (!this.author.userId) {
        return
      }
      let params = {
        userId: this.author.userId
      }
      console.log(params, 1234)
      ARTICLE_DETAIL.getAuthorByUserId({params}).then(result => {
        if (result && result.code == 200) {
          this.authorInfo = result.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/authorHome.scss';
</style>