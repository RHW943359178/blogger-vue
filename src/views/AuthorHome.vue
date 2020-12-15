<template>
  <div class="author_home">
    <div class="author_box">
      <div class="left">
        <div class="header">
          <div class="icon">
            <img src="../assets/img/user_avatar.jpg" alt="">
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
          <div>
            <el-button type="success" plain round>发博客信</el-button>
            <el-button icon="el-icon-plud" type="success" round>关注</el-button>
          </div>
        </div>
        <div class="body">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="article" class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
              <span slot="label"><i class="el-icon-tickets"></i>发表文章</span>
              <div class="article_box">
                <a href=""></a>
                <p></p>
                <div>
                  <span></span>
                  <span></span>
                  <span></span>
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
import ARTICLE_DETAIL from '../api/articleDetail'
export default {
  data () {
    return {
      activeName: 'article',
      pagination: {
        pageSize: 10,
        pageNum: 1
      }
    }
  },
  methods: {
    //  切换tab页
    handleClick() {

    },
    //  获取发表文章列表
    getArticleList() {
      if (!this.$route.query.id) {
        this.$message({type: 'error', message: '无法获取该作者信息', showClose: true})
        return
      }
      let params = {
        userId: this.$route.query.id,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }
      ARTICLE_DETAIL.getArticleById({params}).then(result => {
        if (result && result.code == 200) {
          this.articleInfo = result.data
          this.articleInfo.contentLength = this.articleInfo.content.length
        }
      })
    },
    //  无限加载请求文章列表
    load() {
      this.pagination.pageNum += 1
      console.log(this.pagination.pageNum)
      this.getArticleList()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/authorHome.scss';
</style>