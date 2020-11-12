<template>
  <div class="b_home">
    <div class="b_home_body">
      <div class="b_content_box">
        <div class="article_box" v-for="item in articleList" :key="item.id">
          <div class="article_title">{{ item.title }}</div>
          <div class="article_summary">{{ item.summary }}</div>
          <div class="article_footer">
            <div class="category">
              <i class="el-icon-paperclip"></i>
              <span>{{ item.category }}</span>
            </div>
            <div class="time">
              <i class="el-icon-time"></i>
              <span>{{ item.time }}</span>
            </div>
            <div class=view_count>
              <i class="el-icon-view"></i>
              <span>浏览({{ item.view_count }})</span>
            </div>
            <div class="comment_view">
              <i class="el-icon-chat-dot-round"></i>
              <span>评论({{ item.comment_count }})</span>
            </div>
          </div>
        </div>
      </div>
      <div class="b_home_wall">
        <div class="b_home_bg">
          <img src="../assets/img/banner.png" alt="">
          <img src="../assets/img/avatar.jpg" width="100" alt="">
        </div>
        <div class="introduce">
          <div class="title">XXX</div>
          <div class="title_sub">Web前端设计师、网页设计</div>
          <div class="content">
            一个80后草根站长！一直潜心研究Web前端技术，一边工作一边积累经验，分享一些个人博客模板
          </div>
        </div>
        <div class="spiit_line"></div>
        <div class="category">
          <div class="title">分类云</div>
          <div class="category_box">
            <div class="category_each" v-for="item in categoryList" :key="item.id" :style="returnColor(item.color)">{{ item.categoryName }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div style="height: 30px"></div> -->
    <el-backtop target=".b_home" :bottom="40">
      <div class="back_to_top">
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
import HOME from '../api/home'
export default {
  data () {
    return {
      //  主页文章列表
      articleList: [
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
        {id: '1', title: '5qi go', summary: 'abc fd', category: 'css/html', time: '2019-10-26 15:52:49', view_count: 1, comment_count: 0},
      ],
      //  分类云列表
      categoryList: [
        {id: 1, label: 'css/html', color: '#FF6347'},
        {id: 2, label: '后端开发', color: '	#FF8C00'},
        {id: 3, label: 'Java开发', color: '#CD5C5C'},
        {id: 4, label: 'C++开发', color: '#EECFA1'},
        {id: 5, label: 'Golang开发', color: '#90EE90'},
        {id: 6, label: '架构剖析', color: '#9ACD32'},
      ]
    }
  },
  mounted() {
    this.handleGetAllCategory()
  },
  methods: {
    //  返回分类云背景颜色
    returnColor(cl) {
      console.log(cl, 'cl')
      //  如果没有color值，就默认指定
      if (!cl) {
        return `background: #FF6347;`
      }
      return `background: ${cl};`
    },
    //  获取所有分类
    handleGetAllCategory() {
      HOME.handleGetAllCategory().then(result => {
        if (result && result.code == 200) {
          this.categoryList = result.data
        } else {
          this.$message({type: 'error', message: result.message})
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>