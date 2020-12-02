<template>
  <div class="b_header_box">
    <div class="b_header">
      <div class="b_header_left" @click="bancToHome">
        <img src="../../assets/img/logo.png" alt="">
        <span>博客</span>
      </div>
      <div class="b_header_middle">
        <el-input v-show="$route.path === '/blogger'" v-model="home_search" size="small" :placeholder="placeholder" @focus="searchFocus" clearable>
          <el-button slot="append" size="mini" icon="el-icon-search" @click="searchArticles"></el-button>
        </el-input>
      </div>
      <div class="b_header_right">
        <div class="sign">
          <el-button type="text" @click="jumpToSignIn">注册</el-button>
          <el-button type="text" @click="jumpToSignUp">登录</el-button>
        </div>
        <ul>
          <!-- 用<router-link> 来代替 <li>标签实现页面顶部 tab 也路由切换 -->
          <router-link v-for="(item, index) in navigators" :key="index" tag="li" exact active-class="active" :to="item.url">{{ item.label }}</router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HOME from '../../api/home'
export default {
  data () {
    return {
      home_search: '',
      placeholder: 'css',  //  用于首页搜索框展示
      activeRouter: 1,
      navigators: [
        { id: 1, label: '首页', url: '/blogger' },
        { id: 2, label: '投稿', url: '/blogger/articleEditor' },
        { id: 3, label: '评论', url: '/blogger/comment' },
        { id: 3, label: '我的', url: '/blogger/my' },
        { id: 4, label: '设置', url: '/blogger/set' },
      ]
    }
  },
  mounted () {
  },
  computed: {
    categoryIdList() {  //  当前选中分类
      return this.$store.state.home.categoryIdList
    },
    articleList() { //  文章列表
      return this.$store.state.home.articleList
    },
    pageNum() { //  页码数
      return this.$store.state.home.pageNum
    },
    pageSize() { //  页码范围
      return this.$store.state.home.pageSize
    }, 
    user() {  //  当前登陆人员的信息

    }  
  },
  watch: {
    home_search: function() {
      this.$store.commit('updateSearchCondition', this.home_search)
    }
  },
  methods: {
    //  点击回到主页
    bancToHome() {
      this.$router.push('/blogger')
    },
    //  当前选中路由切换
    activeChange(item) {
      this.activeRouter = item.id
    },
    //  站内搜索出发焦点
    searchFocus() {
      this.home_search = this.placeholder
    },
    //  站内搜索所有文章
    searchArticles() {
      let arr = this.categoryIdList.join()
      let params = {
        condition: this.home_search,
        categoryId: arr,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      HOME.handleGetAllArticle({params}).then(result => {
        if (result && result.code == 200) {
          this.$store.commit('updateArticleList', result.data.list)
          this.$store.commit('updateTotal', result.data.count)
        }
      })
    },
    //  跳转到注册页面
    jumpToSignIn() {
      this.$router.push('/blogger/signIn')
    },
    //  跳转到登录页面
    jumpToSignUp() {
      this.$router.push('/blogger/signUp')
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/public/header.scss';
</style>